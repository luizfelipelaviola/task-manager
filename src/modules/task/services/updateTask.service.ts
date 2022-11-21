import { inject, injectable } from "tsyringe";

// i18n import
import { i18n } from "@shared/i18n";

// Error import
import { AppError } from "@shared/errors/AppError";

// Repository import
import { ITaskRepository } from "@modules/task/repositories/ITask.repository";

// Schema import
import { UpdateTaskSchema } from "@modules/task/schemas/updateTask.schema";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Interfaces
interface IRequest {
  task_id: string;
  user_id: string;
  data: Omit<UpdateTaskSchema, "task_id">;
  language: string;
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
  ) {}

  public async execute({
    task_id,
    user_id,
    data,
    language,
  }: IRequest): Promise<Task> {
    const t = await i18n(language);

    const find = await this.taskRepository.findOneByIdAndUserId(
      task_id,
      user_id,
    );

    if (!find)
      throw new AppError({
        key: "@update_task_service/TASK_NOT_FOUND",
        message: t("@update_task_service/TASK_NOT_FOUND", "Task not found."),
      });

    const patch = Object.entries(data).reduce<{ [key: string]: any }>(
      (total, [key, value]) => {
        const result = total;
        if (typeof value !== "undefined") result[key] = value;
        return result;
      },
      {},
    );

    const task = await this.taskRepository.updateOneById(task_id, patch);

    if (!task)
      throw new AppError({
        key: "@update_task_service/TASK_NOT_FOUND_AFTER_UPDATE",
        message: t(
          "@update_task_service/TASK_NOT_FOUND_AFTER_UPDATE",
          "Task not found.",
        ),
      });

    return task;
  }
}

export { UpdateTaskService };
