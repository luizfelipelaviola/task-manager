import { inject, injectable } from "tsyringe";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Provider import
import { IDatabaseProvider } from "@shared/container/providers/DatabaseProvider/models/IDatabase.provider";

// DTO import
import { ICreateTaskDTO } from "@modules/task/dtos/ITask.dto";

// Interface import
import { ITaskRepository } from "@modules/task/repositories/ITask.repository";

// Util import
import { parse } from "@shared/util/instanceParser";

@injectable()
class TaskRepository implements ITaskRepository {
  constructor(
    @inject("DatabaseProvider")
    private databaseProvider: IDatabaseProvider,
  ) {}

  public async create(data: ICreateTaskDTO): Promise<Task> {
    const task = await this.databaseProvider.task.create({
      data,
    });

    return parse(Task, task);
  }

  public async findOneByIdAndUserId(
    id: string,
    user_id: string,
  ): Promise<Task | null> {
    const task = await this.databaseProvider.task.findFirst({
      where: { id, user_id },
    });

    return parse(Task, task);
  }

  public async findManyByUserId(user_id: string): Promise<Task[]> {
    const tasks = await this.databaseProvider.task.findMany({
      where: { user_id },
    });

    return parse(Task, tasks);
  }

  public async updateOneById(
    id: string,
    data: Partial<Omit<ICreateTaskDTO, "user_id">>,
  ): Promise<Task | null> {
    const task = await this.databaseProvider.task.update({
      where: { id },
      data,
    });

    return parse(Task, task);
  }
}

export { TaskRepository };
