import { inject, injectable } from "tsyringe";

// i18n import
import { i18n } from "@shared/i18n";

// Error import
import { AppError } from "@shared/errors/AppError";

// Repository import
import { ITaskRepository } from "@modules/task/repositories/ITask.repository";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Interfaces
interface IRequest {
  user_id: string;
  task_id: string;
  language: string;
}

@injectable()
class ShowTaskService {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
  ) {}

  public async execute({
    user_id,
    task_id,
    language,
  }: IRequest): Promise<Task> {
    const t = await i18n(language);

    const task = await this.taskRepository.findOneByIdAndUserId(
      task_id,
      user_id,
    );

    if (!task)
      throw new AppError({
        key: "@show_task_service/TASK_NOT_FOUND",
        message: t("@show_task_service/TASK_NOT_FOUND", "Task not found."),
      });

    return task;
  }
}

export { ShowTaskService };
