import semver from "semver";
import "reflect-metadata";

// App info import
import AppInfo from "@/package.json";

// Service import
import { Bootstrap } from "./bootstrap";

// Server import
import { App } from "./app";

// Start server
const app = new App();
const { httpServer: server } = app;

// Start listen
Bootstrap.then(() =>
  app.httpServer.listen(process.env.APP_PORT, () => {
    console.log(
      `⚡️ ${AppInfo.name || "API"} ${
        process.env.NODE_ENV
      } version ${semver.clean(AppInfo.version)} using Node.js ${semver.clean(
        process.version,
      )} running at port ${process.env.APP_PORT}.`,
    );
  }),
);

export { app, server };
