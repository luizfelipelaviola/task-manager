import { inject, injectable } from "tsyringe";

// i18n import
import { i18n } from "@shared/i18n";

// Error import
import { AppError } from "@shared/errors/AppError";

// Repository import
import { IUserRepository } from "@modules/user/repositories/IUser.repository";
import { ITaskRepository } from "@modules/task/repositories/ITask.repository";

// Schema import
import { CreateTaskSchema } from "@modules/task/schemas/createTask.schema";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Interfaces
interface IRequest {
  user_id: string;
  data: CreateTaskSchema;
  language: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
  ) {}

  public async execute({ user_id, data, language }: IRequest): Promise<Task> {
    const t = await i18n(language);

    const user = await this.userRepository.findOneById(user_id);

    if (!user)
      throw new AppError({
        key: "@create_task_service/USER_NOT_FOUND",
        message: t("@create_task_service/USER_NOT_FOUND", "User not found."),
      });

    const task = await this.taskRepository.create({
      ...data,
      user_id,
    });

    return task;
  }
}

export { CreateTaskService };
