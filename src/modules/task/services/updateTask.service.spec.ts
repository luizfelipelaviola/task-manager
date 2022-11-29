import { describe, it, beforeEach, expect, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

// Factory import
import { taskFactory } from "@tests/factories/task.factory";

// DTO import
import { TaskStatus } from "../dtos/ITask.dto";

// Mock import
import { TaskRepositoryMock } from "../repositories/mocks/Task.repository.mock";

// Service import
import { UpdateTaskService } from "./updateTask.service";

const taskRepositoryMock = new TaskRepositoryMock();

describe("UpdateTaskService", () => {
  beforeEach(() => {
    taskRepositoryMock.tasks = [];
  });

  it("should be able to update a task", async () => {
    const task = taskFactory();
    taskRepositoryMock.tasks.push(task);

    const updateTaskService = new UpdateTaskService(taskRepositoryMock);

    const data = {
      description: faker.lorem.sentence(),
      status: TaskStatus.ARCHIVED,
      title: faker.lorem.sentence(),
    };

    await expect(
      updateTaskService.execute({
        data,
        task_id: task.id,
        user_id: task.user_id,
        language: "en",
      }),
    ).resolves.toMatchObject(data);
  });

  it("should not be able to update a task if it doesn't exists", async () => {
    const task = taskFactory();

    const updateTaskService = new UpdateTaskService(taskRepositoryMock);

    const data = {
      description: faker.lorem.sentence(),
      status: TaskStatus.ARCHIVED,
      title: faker.lorem.sentence(),
    };

    await expect(
      updateTaskService.execute({
        data,
        task_id: task.id,
        user_id: task.user_id,
        language: "en",
      }),
    ).rejects.toHaveProperty("key", "@update_task_service/TASK_NOT_FOUND");
  });

  it("should not be able to update a task if doesn't belongs to the user", async () => {
    const task = taskFactory();
    taskRepositoryMock.tasks.push(task);

    const updateTaskService = new UpdateTaskService(taskRepositoryMock);

    const data = {
      description: faker.lorem.sentence(),
      status: TaskStatus.ARCHIVED,
      title: faker.lorem.sentence(),
    };

    await expect(
      updateTaskService.execute({
        data,
        task_id: task.id,
        user_id: "wrong user id",
        language: "en",
      }),
    ).rejects.toHaveProperty("key", "@update_task_service/TASK_NOT_FOUND");
  });

  it("should not be able to update a task if not exists after update", async () => {
    const task = taskFactory();
    taskRepositoryMock.tasks.push(task);

    const mockedTaskRepository = jest.spyOn(
      taskRepositoryMock,
      "updateOneById",
    );

    const updateTaskService = new UpdateTaskService(taskRepositoryMock);

    const data = {
      description: faker.lorem.sentence(),
      status: TaskStatus.ARCHIVED,
      title: faker.lorem.sentence(),
    };

    mockedTaskRepository.mockImplementationOnce(() => Promise.resolve(null));

    await expect(
      updateTaskService.execute({
        data,
        task_id: task.id,
        user_id: task.user_id,
        language: "en",
      }),
    ).rejects.toHaveProperty(
      "key",
      "@update_task_service/TASK_NOT_FOUND_AFTER_UPDATE",
    );
  });
});
