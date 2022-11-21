// DTO import
import { IAgentInfoDTO } from "../dtos/IAgentInfo.dto";
import { IParsedUserAgentInfoDTO } from "../dtos/IParsedUserAgentInfo.dto";

export interface IUserAgentInfoProvider {
  lookup(
    requester: IAgentInfoDTO,
  ): Promise<IParsedUserAgentInfoDTO | undefined>;
}
