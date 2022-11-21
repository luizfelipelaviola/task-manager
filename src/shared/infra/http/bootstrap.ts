// Prerequisites
import { DatabaseProviderInitialization } from "@shared/container/providers/DatabaseProvider";
import { InMemoryDatabaseProviderInitialization } from "@shared/container/providers/InMemoryDatabaseProvider";

// Bootstrap step import
import { app } from "@shared/infra/http/server";

// Boostrap prerequisites
const prerequisites = [
  DatabaseProviderInitialization,
  InMemoryDatabaseProviderInitialization,
];

const Bootstrap = (async () => {
  try {
    console.clear();

    // Await prerequisites
    await prerequisites.reduce((promise, prerequisite) => {
      return promise
        .then(() => prerequisite)
        .catch(err => {
          throw err;
        });
    }, Promise.resolve());

    // Sequence of bootstraping
    await app.graphqlServer.initialization;
  } catch (err: any) {
    console.log(`❌ Bootstrap failed. Shutting down.`);
    console.log(`${err?.message}`);
    process.exit(1);
  }
})();

export { Bootstrap };
