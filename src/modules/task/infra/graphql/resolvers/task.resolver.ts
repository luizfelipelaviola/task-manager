import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { container } from "tsyringe";

// Context import
import { GraphQLContext } from "@shared/infra/graphql/context";

// Service import
import { CreateTaskService } from "@modules/task/services/createTask.service";
import { UpdateTaskService } from "@modules/task/services/updateTask.service";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Schema import
import { CreateTaskSchema } from "@modules/task/schemas/createTask.schema";
import { UpdateTaskSchema } from "@modules/task/schemas/updateTask.schema";
import { IndexTaskService } from "@modules/task/services/indexTask.service";
import { ShowTaskService } from "@modules/task/services/showTask.service";

@Resolver()
class TaskResolver {
  @Authorized()
  @Mutation(() => Task)
  async createTask(
    @Arg("data") data: CreateTaskSchema,
    @Ctx() { session, language }: GraphQLContext,
  ) {
    const createTaskService = container.resolve(CreateTaskService);

    const task = await createTaskService.execute({
      data,
      user_id: session.user.id,
      language,
    });

    return task;
  }

  @Authorized()
  @Mutation(() => Task)
  async updateTask(
    @Arg("data") { task_id, ...data }: UpdateTaskSchema,
    @Ctx() { session, language }: GraphQLContext,
  ) {
    const updateTaskService = container.resolve(UpdateTaskService);

    const task = await updateTaskService.execute({
      task_id,
      user_id: session.user.id,
      data,
      language,
    });

    return task;
  }

  @Authorized()
  @Query(() => [Task], {
    nullable: "items",
  })
  async tasks(@Ctx() { session }: GraphQLContext) {
    const indexTaskService = container.resolve(IndexTaskService);

    const tasks = await indexTaskService.execute({
      user_id: session.user.id,
    });

    return tasks;
  }

  @Authorized()
  @Query(() => Task)
  async task(
    @Arg("task_id") task_id: string,
    @Ctx() { session, language }: GraphQLContext,
  ) {
    const showTaskService = container.resolve(ShowTaskService);

    const task = await showTaskService.execute({
      user_id: session.user.id,
      task_id,
      language,
    });

    return task;
  }
}

export { TaskResolver };
