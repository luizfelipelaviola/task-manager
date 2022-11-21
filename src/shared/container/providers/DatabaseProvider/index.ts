import { container } from "tsyringe";

// Interface import
import { IDatabaseProvider } from "./models/IDatabase.provider";

// Provider import
import { PrismaDatabaseProvider } from "./implementations/prismaDatabase.provider";

const providers = {
  prisma: PrismaDatabaseProvider,
};

const DatabaseProvider = providers.prisma;
const DatabaseProviderInstance = new DatabaseProvider();
const DatabaseProviderInitialization = DatabaseProviderInstance.initialization;

container.registerInstance<IDatabaseProvider>(
  "DatabaseProvider",
  DatabaseProviderInstance.provider,
);

export { DatabaseProvider, DatabaseProviderInitialization };
