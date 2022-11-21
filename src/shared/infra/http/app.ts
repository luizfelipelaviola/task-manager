/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import "reflect-metadata";
import "./bootstrap";
import "express-async-errors";

import * as Sentry from "@sentry/node";
import * as SentryTracing from "@sentry/tracing";
import "@sentry/tracing";
import cors from "cors";
import express, { Express } from "express";
import useragent from "express-useragent";
import semver from "semver";
import helmet from "helmet";
import http, { Server } from "http";
import i18nextMiddleware from "i18next-http-middleware";
import cookieParser from "cookie-parser";

// Container import
import "@shared/container";

// i18n import
import { i18next } from "@shared/i18n";

// Config import
import { corsConfig } from "@config/cors";
import {
  sentryConfig,
  sentryErrorHandlerConfig,
  sentryRequestHandlerConfig,
} from "@config/sentry";

// App info import
import AppInfo from "@/package.json";

// Middleware import
import { authenticationMiddleware } from "@modules/user/infra/http/middlewares/authentication.middleware";
import { userAgentMiddleware } from "./middlewares/userAgent.middleware";
import { rateLimiterMiddleware } from "./middlewares/rateLimiter.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

// Route import
import { routes } from "./routes";

// GraphQL app import
import { GraphQLApp } from "../graphql";

class App {
  public readonly express: Express;
  public readonly httpServer: Server;
  public readonly graphqlServer: GraphQLApp;

  constructor() {
    this.check();

    this.express = express();
    this.httpServer = http.createServer(this.express);
    this.graphqlServer = new GraphQLApp(this.httpServer);
    this.express.set("trust proxy", 1);

    Sentry.init({
      ...sentryConfig,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new SentryTracing.Integrations.Express({
          app: this.express,
        }),
      ],
    });

    this.middlewares();
    this.routes();
    this.gql();
    this.errorHandler();
    this.fallbackHandler();
  }

  private check() {
    const requiredNodeVersion = "16.18.0";

    // Check version
    if (
      !semver.valid(AppInfo.version) ||
      !semver.valid(process.version) ||
      !requiredNodeVersion ||
      !semver.gte(process.version, requiredNodeVersion)
    ) {
      console.log(
        `❌ FATAL FAILURE: This application requires Node.js version at least ${requiredNodeVersion}. This machine is running Node.js version ${semver.clean(
          process.version,
        )}.`,
      );
      process.exit(1);
    }
  }

  private middlewares() {
    if (process.env.NODE_ENV === "production") this.express.use(helmet());
    this.express.use(
      Sentry.Handlers.requestHandler(sentryRequestHandlerConfig),
    );
    this.express.use(Sentry.Handlers.tracingHandler());
    this.express.use(cors(corsConfig));
    this.express.use(cookieParser());
    this.express.use(express.json());
    this.express.use(i18nextMiddleware.handle(i18next));
    this.express.use(useragent.express());
    this.express.use(userAgentMiddleware);
    this.express.use(rateLimiterMiddleware);
    this.express.use(authenticationMiddleware);
  }

  private routes() {
    this.express.use(routes);
  }

  private async gql() {
    await this.graphqlServer.initialization;
    this.express.use(this.graphqlServer.middleware);
  }

  private errorHandler() {
    this.express.use(Sentry.Handlers.errorHandler(sentryErrorHandlerConfig));
    this.express.use(errorMiddleware);
  }

  private fallbackHandler() {
    this.express.use((req, res, next) => {
      if (req.path.startsWith("/graphql")) return next();
      return res.status(404).send();
    });
  }
}

export { App };
