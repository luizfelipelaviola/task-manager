import path from "path";
import { GraphQLError, GraphQLFormattedError, GraphQLSchema } from "graphql";
import {
  buildSchemaSync,
  ForbiddenError as TypeGraphQLForbiddenError,
  UnauthorizedError as TypeGraphQLUnauthorizedError,
  ArgumentValidationError as TypeGraphQLArgumentValidationError,
  NoExplicitTypeError as TypeGraphQLNoExplicitTypeError,
  WrongNullableListOptionError as TypeGraphQLWrongNullableListOptionError,
} from "type-graphql";
import { Server } from "http";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import {
  ApolloError,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
  AuthenticationError,
  PluginDefinition,
  SyntaxError,
  UserInputError,
  ValidationError,
} from "apollo-server-core";
import { Router } from "express";
import * as Sentry from "@sentry/node";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from "graphql-query-complexity";

// Resolver import
import { AppError } from "@shared/errors/AppError";
import { resolvers } from "./resolvers";

// Context import
import { GraphQLContext } from "./context";

// Helper import
import { authChecker } from "./authentication";

class GraphQLApp {
  public readonly initialization: Promise<void>;

  public schema: GraphQLSchema;
  public server: ApolloServer<GraphQLContext>;
  public middleware: Router;

  constructor(httpServer: Server) {
    const schema = buildSchemaSync({
      resolvers,
      emitSchemaFile: path.resolve(__dirname, "generated", "schema.gql"),
      authChecker,
      dateScalarMode: "isoDate",
    });

    this.schema = schema;

    this.server = new ApolloServer<GraphQLContext>({
      schema: this.schema,
      csrfPrevention: true,
      debug: false,
      formatError: this.errorHandler,
      cache: "bounded",
      introspection: true,
      plugins: [
        this.complexityHandler(),
        ...(process.env.NODE_ENV === "production"
          ? [ApolloServerPluginLandingPageDisabled()]
          : [
              ApolloServerPluginDrainHttpServer({ httpServer }),
              ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ]),
      ],
      context: this.context,
    });
    this.initialization = this.init();
  }

  private async init(): Promise<void> {
    await this.server.start();
    this.middleware = this.server.getMiddleware();
  }

  public complexityHandler(): PluginDefinition {
    const { schema } = this;
    const maxComplexity = 50;

    return {
      requestDidStart: async () => ({
        async didResolveOperation({ request, document }) {
          const complexity = getComplexity({
            schema,
            operationName: request.operationName,
            query: document,
            variables: request.variables,
            estimators: [
              fieldExtensionsEstimator(),
              simpleEstimator({ defaultComplexity: 1 }),
            ],
          });
          if (complexity > maxComplexity) {
            throw new ValidationError(
              `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}!`,
            );
          }
        },
      }),
    };
  }

  public async context({ req, res }: ExpressContext): Promise<GraphQLContext> {
    return {
      // HTTP context
      req,
      res,

      // i18n context
      t: req.t,
      i18n: req.i18n,
      language: req.language,
      languages: req.languages,

      // User agent information context
      agent_info: req.agent_info,

      // Session context
      session: req.session,
    };
  }

  private errorHandler(error: GraphQLError): GraphQLFormattedError {
    // Library errors
    if (error.originalError) {
      // App controlled errors
      if (error.originalError instanceof AppError) {
        const appError = error.originalError;
        return new ApolloError(
          appError.message || "Internal server error.",
          appError.key || "@general/INTERNAL_SERVER_ERROR",
          appError.debug ? { fatal: true } : undefined,
        );
      }

      // Authentication errors
      const authenticationErrors = [
        TypeGraphQLUnauthorizedError,
        TypeGraphQLForbiddenError,
      ];
      if (
        authenticationErrors.some(
          authenticationError =>
            error.originalError instanceof authenticationError,
        )
      )
        return new AuthenticationError(error.message);

      // Validation errors
      const validationErrors = [
        TypeGraphQLArgumentValidationError,
        TypeGraphQLNoExplicitTypeError,
        TypeGraphQLWrongNullableListOptionError,
      ];
      if (
        validationErrors.some(
          validationError => error.originalError instanceof validationError,
        )
      )
        return error;
    }

    // Valid GraphQL errors
    const graphqlErrors = [SyntaxError, ValidationError, UserInputError];
    if (
      graphqlErrors.some(
        graphqlError =>
          error instanceof graphqlError ||
          error.originalError instanceof graphqlError,
      )
    )
      return error;

    // Error tracking
    Sentry.captureException(error);
    if (process.env.NODE_ENV === "development") console.log(error);

    // Other errors
    return new ApolloError(
      "Internal server error.",
      "@general/INTERNAL_SERVER_ERROR",
    );
  }
}

export { GraphQLApp };
