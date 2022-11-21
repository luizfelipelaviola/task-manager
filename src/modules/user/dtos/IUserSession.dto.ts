import { Field, ObjectType } from "type-graphql";

// Entity import
import { UserSession } from "@modules/user/entities/userSession.entity";
import { User } from "@modules/user/entities/user.entity";

export type ICreateUserSessionDTO = Pick<
  UserSession,
  "user_id" | "token" | "expires_at" | "payload" | "canceled_at"
>;

export type IUpdateUserSessionDTO = Pick<UserSession, "canceled_at">;

export interface IUserSessionDTO {
  user: User;
  session: UserSession;
}

@ObjectType()
export class Session implements IUserSessionDTO {
  @Field(() => User)
  user: User;

  @Field(() => UserSession)
  session: UserSession;
}
