import ms from "ms";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addMilliseconds } from "date-fns";
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
import { IUserRepository } from "@modules/user/repositories/IUser.repository";
import { IUserSessionRepository } from "../repositories/IUserSession.repository";

// Interfaces
interface IRequest {
  email: string;
  password: string;
  agent_info?: IParsedUserAgentInfoDTO;
  language: string;
}

@injectable()
class SignInService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UserSessionRepository")
    private userSessionRepository: IUserSessionRepository,
  ) {}

  public async execute({
    email,
    password,
    agent_info,
    language,
  }: IRequest): Promise<Session> {
    const t = await i18n(language);

    const user = await this.userRepository.findOneByEmail(email);

    if (!user)
      throw new AppError({
        key: "@sign_in_service/EMAIL_OR_PASSWORD_INCORRECT",
        message: t(
          "@sign_in_service/EMAIL_OR_PASSWORD_INCORRECT",
          "Email or password incorrect.",
        ),
      });

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!isPasswordMatched)
      throw new AppError({
        key: "@sign_in_service/EMAIL_OR_PASSWORD_INCORRECT",
        message: t(
          "@sign_in_service/EMAIL_OR_PASSWORD_INCORRECT",
          "Email or password incorrect.",
        ),
      });

    const token = jwt.sign({}, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRES_IN,
      subject: user.id,
    });

    const session = await this.userSessionRepository.create({
      user_id: user.id,
      token,
      expires_at: addMilliseconds(ms(process.env.JWT_EXPIRES_IN), Date.now()),
      canceled_at: null,
      payload: {
        agent_info,
      },
    });

    return parse(Session, {
      user,
      session,
    });
  }
}

export { SignInService };
