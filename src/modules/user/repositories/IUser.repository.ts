// Entity import
import { User } from "@modules/user/entities/user.entity";

// DTO import
import { ICreateUserDTO } from "../dtos/IUser.dto";

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
}
