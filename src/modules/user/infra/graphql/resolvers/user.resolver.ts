import { Authorized, Ctx, Query, Resolver } from "type-graphql";

// Entity import
import { User } from "@modules/user/entities/user.entity";

// Context import
import { GraphQLContext } from "@shared/infra/graphql/context";

// DTO import
import { Session } from "../../../dtos/IUserSession.dto";

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => User)
  async user(@Ctx() { session: { user } }: GraphQLContext) {
    return user;
  }

  @Authorized()
  @Query(() => Session)
  async session(@Ctx() { session }: GraphQLContext) {
    return session;
  }
}

export { UserResolver };
