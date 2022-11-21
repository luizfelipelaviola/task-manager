import { PrismaClient } from "@prisma/client";

// Util import
import { executeAction } from "@shared/util/executeAction";

const logEnabled = process.env.DATABASE_LOGGER_ENABLED === "true";

class PrismaDatabaseProvider {
  private databaseProvider: PrismaClient;
  public readonly initialization: Promise<void>;

  get provider() {
    return this.databaseProvider;
  }

  constructor() {
    const prismaClient = new PrismaClient({
      log: logEnabled
        ? [
            {
              emit: "event",
              level: "query",
            },
            {
              emit: "stdout",
              level: "error",
            },
            {
              emit: "stdout",
              level: "info",
            },
            {
              emit: "stdout",
              level: "warn",
            },
          ]
        : [],
    });

    if (logEnabled)
      prismaClient.$on("query", e => {
        console.log(`Query: ${e.query}`);
        console.log(`Params: ${e.params}`);
        console.log(`Duration: ${e.duration}ms`);
      });

    this.databaseProvider = prismaClient;
    this.initialization = executeAction({
      action: () => this.databaseProvider.$connect(),
      actionName: "Database connection",
    });
  }
}

export { PrismaDatabaseProvider };
