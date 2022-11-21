import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// App info import
import AppInfo from "@/package.json";

// Use local .env file variables first
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

// Setup args
const argv = yargs(hideBin(process.argv))
  .scriptName(AppInfo.name)
  .usage("$0 [args]")
  .option("env", {
    type: "string",
    default: "development",
    choices: ["development", "production", "staging"],
    alias: "e",
    description: "Environment to run the app",
  })
  .help()
  .parseSync();

async function main() {
  // Start app
  import("./server");
}

main();

export { argv };
