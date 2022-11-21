// Entity import
import { Task } from "@modules/task/entities/task.entity";

// DTO import
import { ICreateTaskDTO, IUpdateTaskDTO } from "@modules/task/dtos/ITask.dto";

export interface ITaskRepository {
  create(data: ICreateTaskDTO): Promise<Task>;

  findOneByIdAndUserId(id: string, user_id: string): Promise<Task | null>;
  findManyByUserId(user_id: string): Promise<Task[]>;

  updateOneById(id: string, data: IUpdateTaskDTO): Promise<Task | null>;
}
