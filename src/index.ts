import "./global";
import { build_config } from "@app/config";
import { Context } from "@app/context";
import Server from "@app/server";
import http from "http";
import { readFileSync } from "node:fs";
import { program } from "commander";
import { Logger } from "./logger";
import chalk from "chalk";

const manifest_file = readFileSync("./package.json");
const manifest = JSON.parse(manifest_file.toString());

const Log = new Logger({ label: manifest.name });

program
  .version(manifest.version)
  .option("-c, --config <path>", "config path", "./config.json")
  .parse();

const main = async () => {
  const options = program.opts();
  const config = await build_config(options.config);
  const context = await Context.initialize(config);
  const server = new Server({
    state: context,
    mount_path: "/api/v1",
  });
  // All routes found in .ts files in ./routes and subdirectories
  // are dynamically imported.
  await server.import_routes();
  //await scanRepository(context);

  const http_server = http.createServer();
  server.mount(http_server);
  http_server.listen(
    { host: context.config.host, port: context.config.port },
    () => {
      Log.info(
        `Webserver listening on ${chalk.red("localhost")}:${chalk.yellow(
          context.config.port,
        )}`,
      );
    },
  );
};

main().catch((e) => console.error(e));
//.then(() => process.exit(0));
