import { inject, injectable } from "tsyringe";

// Repository import
import { ITaskRepository } from "@modules/task/repositories/ITask.repository";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Interfaces
interface IRequest {
  user_id: string;
}

@injectable()
class IndexTaskService {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Task[]> {
    return this.taskRepository.findManyByUserId(user_id);
  }
}

export { IndexTaskService };
