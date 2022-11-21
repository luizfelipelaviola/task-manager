import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

// DTO import
import { TaskStatus } from "../dtos/ITask.dto";

@InputType()
class CreateTaskSchema {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @Field(() => TaskStatus)
  status: TaskStatus;
}

export { CreateTaskSchema };
