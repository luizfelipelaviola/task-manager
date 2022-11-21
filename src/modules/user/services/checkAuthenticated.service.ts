import jwt from "jsonwebtoken";
import { isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";

// i18n import
import { i18n } from "@shared/i18n";

// Error import
import { AppError } from "@shared/errors/AppError";

// DTO import
import { Session } from "@modules/user/dtos/IUserSession.dto";
import { IParsedUserAgentInfoDTO } from "@shared/container/providers/UserAgentInfoProvider/dtos/IParsedUserAgentInfo.dto";

// Util import
import { parse } from "@shared/util/instanceParser";

// Repository import
import { IUserSessionRepository } from "../repositories/IUserSession.repository";

// Interfaces
interface IRequest {
  token: string;
  agent_info?: IParsedUserAgentInfoDTO;
  language: string;
}

@injectable()
class CheckAuthenticatedService {
  constructor(
    @inject("UserSessionRepository")
    private userSessionRepository: IUserSessionRepository,
  ) {}

  public async execute({ token, language }: IRequest): Promise<Session> {
    const t = await i18n(language);

    const session = await this.userSessionRepository.findOneByToken(token);

    if (!session)
      throw new AppError({
        key: "@check_authenticated_service/INVALID_TOKEN",
        message: t(
          "@check_authenticated_service/INVALID_TOKEN",
          "Invalid token.",
        ),
      });

    try {
      jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
        subject: session.user_id,
      });
    } catch (err) {
      throw new AppError({
        key: "@check_authenticated_service/INVALID_TOKEN",
        message: t(
          "@check_authenticated_service/INVALID_TOKEN",
          "Invalid token.",
        ),
      });
    }

    if (isAfter(new Date(), session.expires_at))
      throw new AppError({
        key: "@check_authenticated_service/EXPIRED_TOKEN",
        message: t(
          "@check_authenticated_service/EXPIRED_TOKEN",
          "Expired token.",
        ),
      });

    return parse(Session, {
      user: session.user,
      session,
    });
  }
}

export { CheckAuthenticatedService };
