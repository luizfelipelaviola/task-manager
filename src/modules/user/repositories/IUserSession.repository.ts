// Entity import
import { UserSession } from "@modules/user/entities/userSession.entity";

// DTO import
import {
  ICreateUserSessionDTO,
  IUpdateUserSessionDTO,
} from "../dtos/IUserSession.dto";

export interface IUserSessionRepository {
  create(data: ICreateUserSessionDTO): Promise<UserSession>;

  findOneById(id: string): Promise<UserSession | null>;
  findOneByToken(token: string): Promise<UserSession | null>;
  findOneByTokenAndUserId(
    token: string,
    user_id: string,
  ): Promise<UserSession | null>;

  updateOneById(
    id: string,
    data: IUpdateUserSessionDTO,
  ): Promise<UserSession | null>;
}
