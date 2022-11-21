import { inject, injectable } from "tsyringe";

// Provider import
import { IDatabaseProvider } from "@shared/container/providers/DatabaseProvider/models/IDatabase.provider";

// DTO import
import {
  ICreateUserSessionDTO,
  IUpdateUserSessionDTO,
} from "@modules/user/dtos/IUserSession.dto";

// Entity import
import { UserSession } from "@modules/user/entities/userSession.entity";

// Interface import
import { IUserSessionRepository } from "@modules/user/repositories/IUserSession.repository";

// Util import
import { parse } from "@shared/util/instanceParser";

@injectable()
class UserSessionRepository implements IUserSessionRepository {
  private relations = {
    user: {
      include: {
        tasks: true,
      },
    },
  };

  constructor(
    @inject("DatabaseProvider")
    private databaseProvider: IDatabaseProvider,
  ) {}

  public async create(data: ICreateUserSessionDTO): Promise<UserSession> {
    const userSession = await this.databaseProvider.userSession.create({
      data,
      include: this.relations,
    });

    return parse(UserSession, userSession);
  }

  public async findOneById(id: string): Promise<UserSession | null> {
    const userSession = await this.databaseProvider.userSession.findFirst({
      where: {
        id,
      },
      include: this.relations,
    });

    return parse(UserSession, userSession);
  }

  public async findOneByToken(token: string): Promise<UserSession | null> {
    const userSession = await this.databaseProvider.userSession.findFirst({
      where: {
        token,
      },
      include: this.relations,
    });

    return parse(UserSession, userSession);
  }

  public async findOneByTokenAndUserId(
    token: string,
    user_id: string,
  ): Promise<UserSession | null> {
    const userSession = await this.databaseProvider.userSession.findFirst({
      where: {
        token,
        user_id,
      },
      orderBy: {
        created_at: "desc",
      },
      include: this.relations,
    });

    return parse(UserSession, userSession);
  }

  public async updateOneById(
    id: string,
    data: IUpdateUserSessionDTO,
  ): Promise<UserSession | null> {
    const record = await this.findOneById(id);
    if (!record) return null;

    const userSession = await this.databaseProvider.userSession.update({
      where: {
        id,
      },
      data,
      include: this.relations,
    });

    return parse(UserSession, userSession);
  }
}

export { UserSessionRepository };
