import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// Entity import
import { User } from "@modules/user/entities/user.entity";

const password = faker.internet.password();

const userFactory = (): User => {
  const user = new User();

  Object.assign<User, User>(user, {
    id: uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password_hash: bcrypt.hashSync(password, 8),
    language: "en",
    payload: {},
    tasks: [],
    sessions: [],
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  });

  return user;
};

export { userFactory, password };
