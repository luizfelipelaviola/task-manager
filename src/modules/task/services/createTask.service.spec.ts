import { describe, it, beforeEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";

// Factory import
import { userFactory } from "@tests/factories/user.factory";

// Mock import
import { UserRepositoryMock } from "@modules/user/repositories/mocks/User.repository.mock";
import { TaskRepositoryMock } from "../repositories/mocks/Task.repository.mock";

// DTO import
import { TaskStatus } from "../dtos/ITask.dto";

// Service import
import { CreateTaskService } from "./createTask.service";

const userRepositoryMock = new UserRepositoryMock();
const taskRepositoryMock = new TaskRepositoryMock();

describe("CreateTaskService", () => {
  beforeEach(() => {
    taskRepositoryMock.tasks = [];
  });

  it("should be able to create a task", async () => {
    const user = userFactory();
    userRepositoryMock.users.push(user);

    const createTaskService = new CreateTaskService(
      userRepositoryMock,
      taskRepositoryMock,
    );

    const data = {
      description: faker.lorem.sentence(),
      status: TaskStatus.ARCHIVED,
      title: faker.lorem.sentence(),
    };

    await expect(
      createTaskService.execute({
        data,
        user_id: user.id,
        language: "en",
      }),
    ).resolves.toMatchObject(data);
  });

  it("should not be able to create a task if user does not exists", async () => {
    const user = userFactory();

    const createTaskService = new CreateTaskService(
      userRepositoryMock,
      taskRepositoryMock,
    );

    const data = {
      description: faker.lorem.sentence(),
      status: TaskStatus.ARCHIVED,
      title: faker.lorem.sentence(),
    };

    await expect(
      createTaskService.execute({
        data,
        user_id: user.id,
        language: "en",
      }),
    ).rejects.toHaveProperty("key", "@create_task_service/USER_NOT_FOUND");
  });
});
