import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { container } from "tsyringe";

// Context import
import { GraphQLContext } from "@shared/infra/graphql/context";

// Service import
import { SignInService } from "@modules/user/services/signIn.service";

// DTO import
import { Session } from "@modules/user/dtos/IUserSession.dto";

// Schema import
import { SignInSchema } from "@modules/user/schemas/signIn.schema";

@Resolver()
class SignInResolver {
  @Mutation(() => Session)
  async signIn(
    @Arg("data") { email, password }: SignInSchema,
    @Ctx() { agent_info, language }: GraphQLContext,
  ) {
    const signInService = container.resolve(SignInService);

    const session = await signInService.execute({
      email,
      password,
      agent_info,
      language,
    });

    return session;
  }
}

export { SignInResolver };
