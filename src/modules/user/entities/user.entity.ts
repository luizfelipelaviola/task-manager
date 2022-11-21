import { Field, ID, ObjectType } from "type-graphql";
import { Exclude, Type } from "class-transformer";

// Type import
import { UserType } from "@shared/types/models";

// Entity import
import { Task } from "@modules/task/entities/task.entity";
import { UserSession } from "@modules/user/entities/userSession.entity";

@ObjectType()
class User implements UserType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Exclude()
  password_hash: string;

  @Field(() => String, { nullable: true })
  language: string | null;

  @Type(() => Task)
  @Field(() => [Task], {
    nullable: "items",
  })
  tasks: Task[];

  @Exclude()
  @Type(() => UserSession)
  sessions: UserSession[];

  @Exclude()
  payload: Record<string, any>;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

export { User };
