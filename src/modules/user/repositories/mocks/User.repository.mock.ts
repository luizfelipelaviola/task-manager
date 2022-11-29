import { v4 as uuid } from "uuid";

// Entity import
import { User } from "@modules/user/entities/user.entity";

// DTO import
import { ICreateUserDTO } from "@modules/user/dtos/IUser.dto";

// Interface import
import { IUserRepository } from "../IUser.repository";

class UserRepositoryMock implements IUserRepository {
  public users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    });
    this.users.push(user);
    return user;
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }
}

export { UserRepositoryMock };
