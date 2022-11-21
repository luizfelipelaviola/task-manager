import Redis from "ioredis";

// Util import
import { executeAction } from "@shared/util/executeAction";

// Config import
import { redisConfig } from "@config/redis";

class RedisInMemoryDatabaseProvider {
  private inMemoryDatabaseProvider: Redis;
  public readonly initialization: Promise<void>;

  get provider() {
    return this.inMemoryDatabaseProvider;
  }

  constructor() {
    const redisClient = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      username: redisConfig.username,
      password: redisConfig.password,
      db: redisConfig.db,
      lazyConnect: true,
    });

    redisClient.on("error", message =>
      console.log(`❌ Redis error: "${message}"`),
    );

    redisClient.on("error", () => console.log(`❌ Redis disconnected`));

    this.initialization = executeAction({
      action: () => redisClient.connect(),
      actionName: "Redis connection",
    });

    this.inMemoryDatabaseProvider = redisClient;
  }
}

export { RedisInMemoryDatabaseProvider };
