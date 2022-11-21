import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { container } from "tsyringe";

// Context import
import { GraphQLContext } from "@shared/infra/graphql/context";

// Service import
import { SignUpService } from "@modules/user/services/signUp.service";

// DTO import
import { Session } from "@modules/user/dtos/IUserSession.dto";

// Schema import
import { SignUpSchema } from "@modules/user/schemas/signUp.schema";

@Resolver()
class SignUpResolver {
  @Mutation(() => Session)
  async signUp(
    @Arg("data") { email, name, password }: SignUpSchema,
    @Ctx() { agent_info, language }: GraphQLContext,
  ) {
    const signUpService = container.resolve(SignUpService);

    const session = await signUpService.execute({
      email,
      name,
      password,
      agent_info,
      language,
    });

    return session;
  }
}

export { SignUpResolver };
