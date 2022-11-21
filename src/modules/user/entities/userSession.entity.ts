/* eslint-disable no-use-before-define */
import { Field, ID, ObjectType } from "type-graphql";
import { Type } from "class-transformer";

// Type import
import { UserSessionType } from "@shared/types/models";

// Scalar import
import { JSONObject } from "@shared/types/json";

// Entity import
import { User } from "./user.entity";

// Entity import
@ObjectType()
class UserSession implements UserSessionType {
  @Field(() => ID)
  id: string;

  @Field()
  user_id: string;

  @Field(() => User)
  @Type(() => User)
  user: User;

  @Field()
  token: string;

  @Field()
  expires_at: Date;

  @Field(() => JSONObject)
  payload: Record<string, any>;

  @Field(() => Date, { nullable: true })
  canceled_at: Date | null;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

export { UserSession };
