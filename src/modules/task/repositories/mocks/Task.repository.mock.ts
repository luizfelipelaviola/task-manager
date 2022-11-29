import { v4 as uuid } from "uuid";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// DTO import
import { ICreateTaskDTO, IUpdateTaskDTO } from "@modules/task/dtos/ITask.dto";

// Interface import
import { ITaskRepository } from "../ITask.repository";

class TaskRepositoryMock implements ITaskRepository {
  public tasks: Task[] = [];

  public async create(data: ICreateTaskDTO): Promise<Task> {
    const task = new Task();
    Object.assign(task, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    });
    this.tasks.push(task);
    return task;
  }

  public async findOneByIdAndUserId(
    id: string,
    user_id: string,
  ): Promise<Task | null> {
    return (
      this.tasks.find(task => task.id === id && task.user_id === user_id) ||
      null
    );
  }

  public async findManyByUserId(user_id: string): Promise<Task[]> {
    return this.tasks.filter(task => task.user_id === user_id);
  }

  public async updateOneById(
    id: string,
    data: IUpdateTaskDTO,
  ): Promise<Task | null> {
    const task = this.tasks.find(item => item.id === id);
    const index = this.tasks.findIndex(s => s.id === id);
    if (!task || index < 0) return null;
    Object.assign(task, data);
    this.tasks[index] = task;
    return task;
  }
}

export { TaskRepositoryMock };
