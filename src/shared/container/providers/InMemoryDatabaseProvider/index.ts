import { container } from "tsyringe";

// Interface import
import { IInMemoryDatabaseProvider } from "./models/IInMemoryDatabase.provider";

// Provider import
import { RedisInMemoryDatabaseProvider } from "./implementations/redisInMemoryDatabase.provider";

const providers = {
  redis: RedisInMemoryDatabaseProvider,
};

const InMemoryDatabaseProvider = providers.redis;
const InMemoryDatabaseProviderInstance = new InMemoryDatabaseProvider();
const InMemoryDatabaseProviderInitialization =
  InMemoryDatabaseProviderInstance.initialization;

container.registerInstance<IInMemoryDatabaseProvider>(
  "InMemoryDatabaseProvider",
  InMemoryDatabaseProviderInstance.provider,
);

export { InMemoryDatabaseProvider, InMemoryDatabaseProviderInitialization };
