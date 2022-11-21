import { i18n, TFunction } from "i18next";
import { Request, Response } from "express";

// DTO import
import { IParsedUserAgentInfoDTO } from "@shared/container/providers/UserAgentInfoProvider/dtos/IParsedUserAgentInfo.dto";
import { Session } from "@modules/user/dtos/IUserSession.dto";

export type GraphQLContext = {
  // HTTP context
  req: Request;
  res: Response;

  // i18n context
  t: TFunction;
  i18n: i18n;
  language: string;
  languages: string[];

  // User agent information context
  agent_info?: IParsedUserAgentInfoDTO;

  // Session context
  session: Session;
};
