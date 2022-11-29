import { describe, it, beforeEach, expect } from "@jest/globals";
import { v4 as uuid } from "uuid";

// Factory import
import { taskFactory } from "@tests/factories/task.factory";

// Mock import
import { TaskRepositoryMock } from "../repositories/mocks/Task.repository.mock";

// Service import
import { ShowTaskService } from "./showTask.service";

const taskRepositoryMock = new TaskRepositoryMock();

describe("ShowTaskService", () => {
  beforeEach(() => {
    taskRepositoryMock.tasks = [];
  });

  it("should be able to show a task", async () => {
    const tasks = [...Array(5)].map(() => taskFactory());
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    taskRepositoryMock.tasks.push(...tasks);

    const showTaskService = new ShowTaskService(taskRepositoryMock);

    await expect(
      showTaskService.execute({
        task_id: task.id,
        user_id: task.user_id,
        language: "en",
      }),
    ).resolves.toBe(task);
  });

  it("should not be able to show a task if not found", async () => {
    const user_id = uuid();
    const tasks = [...Array(5)].map(() => ({
      ...taskFactory(),
      user_id,
    }));
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    task.user_id = "invalid-user-id";
    taskRepositoryMock.tasks.push(...tasks);

    const showTaskService = new ShowTaskService(taskRepositoryMock);

    await expect(
      showTaskService.execute({
        task_id: task.id,
        user_id,
        language: "en",
      }),
    ).rejects.toHaveProperty("key", "@show_task_service/TASK_NOT_FOUND");
  });
});
