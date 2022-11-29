import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

// Entity import
import { Task } from "@modules/task/entities/task.entity";

// Factory import
import { userFactory } from "./user.factory";

const taskFactory = (): Task => {
  const user = userFactory();

  const task = new Task();

  Object.assign<Task, Task>(task, {
    id: uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    status: "TODO",
    user_id: user.id,
    user,
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  });

  return task;
};

export { taskFactory };
