import { v4 as uuid } from "uuid";

// Entity import
import { UserSession } from "@modules/user/entities/userSession.entity";

// DTO import
import {
  ICreateUserSessionDTO,
  IUpdateUserSessionDTO,
} from "@modules/user/dtos/IUserSession.dto";

// Interface import
import { IUserSessionRepository } from "../IUserSession.repository";

class UserSessionRepositoryMock implements IUserSessionRepository {
  public sessions: UserSession[] = [];

  public async create(data: ICreateUserSessionDTO): Promise<UserSession> {
    const session = new UserSession();
    Object.assign(session, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    });
    this.sessions.push(session);
    return session;
  }

  public async findOneById(id: string): Promise<UserSession | null> {
    return this.sessions.find(session => session.id === id) || null;
  }

  public async findOneByToken(token: string): Promise<UserSession | null> {
    return this.sessions.find(session => session.token === token) || null;
  }

  public async findOneByTokenAndUserId(
    token: string,
    user_id: string,
  ): Promise<UserSession | null> {
    return (
      this.sessions.find(
        session => session.token === token && session.user_id === user_id,
      ) || null
    );
  }

  public async updateOneById(
    id: string,
    data: IUpdateUserSessionDTO,
  ): Promise<UserSession | null> {
    const session = await this.findOneById(id);
    const index = this.sessions.findIndex(s => s.id === id);
    if (!session || index < 0) return null;
    Object.assign(session, data);
    this.sessions[index] = session;
    return session;
  }
}

export { UserSessionRepositoryMock };
