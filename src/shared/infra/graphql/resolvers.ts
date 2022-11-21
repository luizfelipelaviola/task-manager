import { BuildSchemaOptions } from "type-graphql";

// Resolver import
import { SignUpResolver } from "@modules/user/infra/graphql/resolvers/signUp.resolver";
import { SignInResolver } from "@modules/user/infra/graphql/resolvers/signIn.resolver";
import { UserResolver } from "@modules/user/infra/graphql/resolvers/user.resolver";
import { TaskResolver } from "@modules/task/infra/graphql/resolvers/task.resolver";

const { resolvers }: Pick<BuildSchemaOptions, "resolvers"> = {
  resolvers: [SignUpResolver, SignInResolver, UserResolver, TaskResolver],
};

export { resolvers };
