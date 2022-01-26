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
import { export_exams } from "./export_exams";
import { import_exams_json } from "./import/exams";
import { PrismaClient } from ".prisma/client";
import { import_folder } from "./utils";

program
  .version(process.env.NPM_PACKAGE_VERSION ?? "Unknown version")
  .option("-c, --config <path>", "config path", "./config.json")
  .option("-s, --scrape", "run the scraper")
  .option("-w, --workers", "how many workers to start")
  .option("-e, --export", "export exam data to stdout")
  .option("-i, --import", "export exam data from stdin")
  .option("--statistic <type> [args...]", "generate statistics based on type")
  .option("--max <n>", "print max n statistics")
  .parse();

const statistic_command = async () => {
  const options = program.opts();

  const statistics = await import_folder("./statistics");
  if (options.statistic.first() in statistics) {
    const prisma = new PrismaClient();

    // prisma.$use(async (params, next) => {
    //   const before = Date.now();

    //   const result = await next(params);

    //   const after = Date.now();

    //   console.log(
    //     `Query ${params.model}.${params.action} took ${after - before}ms`,
    //   );

    //   return result;
    // });

    await statistics[options.statistic.first()](
      prisma,
      ...options.statistic.slice(1),
    );
    // if (data.first() === undefined) {
    //   console.info("No results");
    //   return;
    // }

    // const res = data;
    // if (options.max) {
    //   res.take(Number(options.max));
    // }
    // console.table(res, Object.keys(data.first()));
  } else {
    console.info("No such statistic");
    console.info("Available statistics:");
    for (const k of Object.keys(statistics)) {
      console.info(`  ${k}`);
    }
  }
};

const main = async () => {
  const options = program.opts();
  const config = await build_config(options.config);

  if (options.export) {
    await export_exams();
    process.exit(0);
  }

  if (options.statistic) {
    await statistic_command();
    process.exit(0);
  }

  await import_exams_json(config.paths.exam_data);

  const ctx = await Context.initialize(config);

  // const examiners_by_number_of_courses =
  //   await ctx.prisma.courseInstance.findMany({
  //     select: {
  //       course_code: true,
  //       examiner: true,
  //     },
  //     where: {
  //       academic_year: "2021/2022",
  //     },
  //   });

  // const examiners: { [key: string]: Set<string> } = {};
  // examiners_by_number_of_courses
  //   .filter((e) => e.course_code[3] !== "X")
  //   .forEach((c) => {
  //     if (!(c.examiner.name in examiners)) {
  //       examiners[c.examiner.name] = new Set();
  //     }
  //     examiners[c.examiner.name].add(c.course_code);
  //   });

  // const res = Object.entries(examiners)
  //   .map(([name, courses]): [number, string, Set<string>] => [
  //     courses.size,
  //     name,
  //     courses,
  //   ])
  //   .sortBy(([a], [b]) => b - a);
  // console.log(res.take(10));

  // const t1 = (
  //   await ctx.prisma.survey.findMany({
  //     include: {
  //       instance: {
  //         include: {
  //           examiner: true,
  //         },
  //       },
  //     },
  //   })
  // ).groupBy((s) => s.course_code);
  // const t2 = Object.entries(t1)
  //   .map(([key, val]) => [
  //     key,
  //     val.sortBy((a, b) => a.academic_year.localeCompare(b.academic_year)),
  //   ])
  //   .filter(([, s]) => {
  //     if (typeof s === "string") return false;
  //     const exists = s.find((curr, i, arr) => {
  //       if (arr[i + 1]) {
  //         return (
  //           curr.total_impression_median <= 2 &&
  //           arr[i + 1].total_impression_median > 4 &&
  //           curr.instance.examiner.cid === arr[i + 1].instance.examiner.cid
  //         );
  //       }
  //       return false;
  //     });
  //     return exists !== undefined;
  //   })
  //   .map(([code]) => code);

  // console.log(t2);

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
