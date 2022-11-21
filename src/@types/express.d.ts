import { i18n, TFunction } from "i18next";

// DTO import
import { IParsedUserAgentInfoDTO } from "@shared/container/providers/UserAgentInfoProvider/dtos/IParsedUserAgentInfo.dto";
import { Session } from "@modules/user/dtos/IUserSession.dto";

declare global {
  namespace Express {
    interface Request {
      // i18n
      t: TFunction;
      i18n: i18n;
      language: string;
      languages: string[];

      // User information
      agent_info?: IParsedUserAgentInfoDTO;

      // User
      session: Session;
    }
  }
}

export {};
