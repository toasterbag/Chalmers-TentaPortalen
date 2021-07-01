import "./global";
import { build_config } from "@app/config";
import { Context } from "@app/context";
import Server from "@app/server";
import http from "http";
import { readFileSync } from "node:fs";
import { program } from "commander";
import { Logger } from "./logger";
import chalk from "chalk";
import { scrape_everything } from "@app/import/study_portal";
import { isWithinInterval } from "date-fns";

const manifest_file = readFileSync("./package.json");
const manifest = JSON.parse(manifest_file.toString());

const Log = new Logger({ label: manifest.name });

program
  .version(manifest.version)
  .option("-c, --config <path>", "config path", "./config.json")
  .option("-s, --scrape", "run the scraper before starting")
  .parse();

const main = async () => {
  const options = program.opts();
  const config = await build_config(options.config);
  const ctx = await Context.initialize(config);
  const server = new Server({
    state: ctx,
    mount_path: "/api/v1",
  });

  if (options.scrape) {
    await scrape_everything(ctx);
  }

  // All routes found in .ts files in ./routes and subdirectories
  // are dynamically imported.
  await server.import_routes();

  const http_server = http.createServer();
  server.mount(http_server);
  http_server.listen({ host: ctx.config.host, port: ctx.config.port }, () => {
    Log.info(
      `Webserver listening on ${chalk.red("localhost")}:${chalk.yellow(
        ctx.config.port,
      )}`,
    );
  });
};

main().catch((e) => console.error(e));
//.then(() => process.exit(0));
