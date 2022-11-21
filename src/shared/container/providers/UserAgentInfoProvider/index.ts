import { container } from "tsyringe";

// Interface import
import { IUserAgentInfoProvider as IUserAgentInfo } from "./models/IUserAgentInfo.provider";

// Provider import
import { GeoLookupUserAgentInfoProvider } from "./implementations/geoLookupUserAgentInfo.provider";

const providers = {
  geolookup: GeoLookupUserAgentInfoProvider,
};

const UserAgentInfoProvider = providers.geolookup;
const UserAgentInfoProviderInstance = new UserAgentInfoProvider();
const UserAgentInfoProviderInitialization = Promise.resolve();

container.registerInstance<IUserAgentInfo>(
  "UserAgentInfoProvider",
  UserAgentInfoProviderInstance,
);

export { UserAgentInfoProvider, UserAgentInfoProviderInitialization };
