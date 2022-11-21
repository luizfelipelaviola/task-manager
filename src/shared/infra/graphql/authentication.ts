import { AuthChecker } from "type-graphql";

import { GraphQLContext } from "./context";

const authChecker: AuthChecker<GraphQLContext> = (
  { context: { session } },
  roles,
) => {
  // if `@Authorized()`, check only if user exists
  if (roles.length === 0) return session !== undefined;

  if (!session) return false;

  return false;
};

export { authChecker };
