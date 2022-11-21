import { Field, ID, ObjectType } from "type-graphql";
import { Type, Exclude } from "class-transformer";

// Type import
import { TaskType } from "@shared/types/models";

// Entity import
import { User } from "@modules/user/entities/user.entity";

@ObjectType()
class Task implements TaskType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  user_id: string;

  @Exclude()
  @Type(() => User)
  user: User;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

export { Task };
