import { inject, injectable } from "tsyringe";

// Entity import
import { User } from "@modules/user/entities/user.entity";

// Provider import
import { IDatabaseProvider } from "@shared/container/providers/DatabaseProvider/models/IDatabase.provider";

// DTO import
import { ICreateUserDTO } from "@modules/user/dtos/IUser.dto";

// Interface import
import { IUserRepository } from "@modules/user/repositories/IUser.repository";

// Util import
import { parse } from "@shared/util/instanceParser";

@injectable()
class UserRepository implements IUserRepository {
  private relations = {
    tasks: true,
  };

  constructor(
    @inject("DatabaseProvider")
    private databaseProvider: IDatabaseProvider,
  ) {}

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.databaseProvider.user.create({
      data,
      include: this.relations,
    });

    return parse(User, user);
  }

  public async findOneById(id: string): Promise<User | null> {
    const user = await this.databaseProvider.user.findFirst({
      where: { id },
      include: this.relations,
    });

    return parse(User, user);
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.databaseProvider.user.findUnique({
      where: { email },
      include: this.relations,
    });

    return parse(User, user);
  }
}

export { UserRepository };
