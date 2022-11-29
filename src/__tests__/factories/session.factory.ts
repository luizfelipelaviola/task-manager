import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

// Entity import
import { UserSession } from "@modules/user/entities/userSession.entity";

// Factory import
import { userFactory } from "./user.factory";

const sessionFactory = (): UserSession => {
  const user = userFactory();
  const session = new UserSession();

  Object.assign<UserSession, UserSession>(session, {
    id: user.id,
    user_id: user.id,
    token: jwt.sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }),
    expires_at: faker.date.future(),
    payload: {},
    canceled_at: null,
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    user,
  });

  return session;
};

export { sessionFactory };
