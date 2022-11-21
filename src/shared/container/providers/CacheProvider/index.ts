import { container } from "tsyringe";

// Interface import
import { ICacheProvider } from "./models/ICache.provider";

// Provider import
import { RedisCacheProvider } from "./implementations/redisCache.provider";

const providers = {
  redis: RedisCacheProvider,
};

const CacheProvider = providers.redis;
const CacheProviderInstance = container.resolve(CacheProvider);
const CacheProviderInitialization = Promise.resolve();

container.registerInstance<ICacheProvider>(
  "CacheProvider",
  CacheProviderInstance,
);

export { CacheProvider, CacheProviderInitialization };
