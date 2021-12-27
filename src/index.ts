import "./global";
import { build_config } from "@app/config";
import { Context } from "@app/context";
import Server from "@app/server";
import http from "http";
import { program } from "commander";
import chalk from "chalk";
import { scrape_everything } from "@app/import/study_portal";
import UpdatePassratesByPeriod from "@app/jobs/update_passrates";
import { cpus } from "os";
import { start_workers } from "./worker/worker";

program
  .version(process.env.NPM_PACKAGE_VERSION ?? "Unknown version")
  .option("-c, --config <path>", "config path", "./config.json")
  .option("-s, --scrape", "run the scraper")
  .option("-w, --workers", "how many workers to start")
  .parse();

const main = async () => {
  const options = program.opts();
  const config = await build_config(options.config);
  const ctx = await Context.initialize(config);
  const server = new Server({
    ctx,
    mount_path: "/api/v1",
  });

  UpdatePassratesByPeriod(ctx).start();

  start_workers(
    options.config,
    options.worker ? Number(options.worker) : cpus().length,
  );

  if (options.scrape) {
    await scrape_everything(ctx);
    // await test_case(ctx);
    process.exit(0);
  }

  // All routes found in .ts files in ./routes and its' subdirectories
  // are dynamically imported.
  await server.import_routes();

  const http_server = http.createServer();
  server.mount(http_server);
  http_server.listen({ host: ctx.config.host, port: ctx.config.port }, () => {
    console.info(
      `Webserver listening on ${chalk.red("localhost")}:${chalk.yellow(
        ctx.config.port,
      )}`,
    );
  });
};

main().catch((e) => console.error(e));
