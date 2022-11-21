import { Task } from "@modules/task/entities/task.entity";
import { registerEnumType } from "type-graphql";

// eslint-disable-next-line no-shadow
enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
}

registerEnumType(TaskStatus, {
  name: "TaskStatus",
});

export type ICreateTaskDTO = Pick<Task, "title" | "description" | "user_id"> & {
  status: TaskStatus;
};

export type IUpdateTaskDTO = Partial<Omit<ICreateTaskDTO, "user_id">>;

export { TaskStatus };
