import { describe, it, beforeEach, expect } from "@jest/globals";

// Factory import
import { taskFactory } from "@tests/factories/task.factory";

// Mock import
import { TaskRepositoryMock } from "../repositories/mocks/Task.repository.mock";

// Service import
import { IndexTaskService } from "./indexTask.service";

const taskRepositoryMock = new TaskRepositoryMock();

describe("IndexTaskService", () => {
  beforeEach(() => {
    taskRepositoryMock.tasks = [];
  });

  it("should be able to index a task", async () => {
    const tasks = [...Array(5)].map(() => taskFactory());
    const [{ user_id }] = tasks;
    tasks[1].user_id = user_id;
    taskRepositoryMock.tasks.push(...tasks);

    const indexTaskService = new IndexTaskService(taskRepositoryMock);

    await expect(
      indexTaskService.execute({
        user_id,
      }),
    ).resolves.toHaveLength(2);
  });
});
