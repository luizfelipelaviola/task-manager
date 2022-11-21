// Entity import
import { User } from "@modules/user/entities/user.entity";

export type ICreateUserDTO = Pick<
  User,
  "email" | "name" | "password_hash" | "payload"
> &
  Partial<Pick<User, "language">>;
