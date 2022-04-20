import "./global";
import { build_config } from "@app/config";
import { Context } from "@app/context";
import Server from "@app/server";
import http from "http";
import { program } from "commander";
import chalk from "chalk";
import { scrape_everything } from "@app/import/study_portal";
import UpdatePassratesByPeriod from "@app/jobs/update_passrates";
import UpdateChalmersSurveyAggregate from "@app/jobs/update_chalmers_survey_aggregates";
import UpdateProgrammeSurveyAggregate from "@app/jobs/update_programme_survey_aggregates";
import UpdateSurveyPerPeriod from "@app/jobs/update_survey_per_period";
import UpdateDepartmentSurveyAggregate from "@app/jobs/update_survey_per_department";
import { cpus } from "os";
import { Exam, Role } from "@prisma/client";
import { mkdirp, writeFile } from "fs-extra";
import { start_workers } from "./worker/worker";
import { export_exams } from "./export_exams";
import { import_exams_json } from "./import/exams";
import { AcademicYear } from "./utils";
import { isSome } from "./std/option";

program
  .version(process.env.NPM_PACKAGE_VERSION ?? "Unknown version")
  .option("-c, --config <path>", "config path", "./config.json")
  .option("-s, --scrape", "run the scraper")
  .option("-w, --workers", "how many workers to start")
  .option("-e, --export", "export exam data to stdout")
  .option("-i, --import", "export exam data from stdin")
  .option("-a, --analysis <type> [args...]", "generate analysis based on type")
  .option("--max <n>", "print max n statistics")
  .parse();

const analysis_command = async () => {
  // const options = program.opts();
  // const prisma = new PrismaClient();
  // await passthrough_for_editi(prisma, 1);
  // const statistics = await import_folder("./statistics");
  // if (options.analysis.first() in statistics) {
  // prisma.$use(async (params, next) => {
  //   const before = Date.now();
  //   const result = await next(params);
  //   const after = Date.now();
  //   console.log(
  //     `Query ${params.model}.${params.action} took ${after - before}ms`,
  //   );
  //   return result;
  // });
  // await statistics[options.statistic.first()](
  //   prisma,
  //   ...options.statistic.slice(1),
  // );
  // if (data.first() === undefined) {
  //   console.info("No results");
  //   return;
  // }
  // const res = data;
  // if (options.max) {
  //   res.take(Number(options.max));
  // }
  // console.table(res, Object.keys(data.first()));
  // } else {
  //   console.info("No such statistic");
  //   console.info("Available statistics:");
  //   for (const k of Object.keys(statistics)) {
  //     console.info(`  ${k}`);
  //   }
  // }
};

const main = async () => {
  const options = program.opts();
  const config = await build_config(options.config);

  if (options.export) {
    await export_exams();
    process.exit(0);
  }

  if (options.analysis) {
    await analysis_command();
    process.exit(0);
  }

  await import_exams_json(config.paths.exam_data);

  const ctx = await Context.initialize(config);

  // const res = await passthrough_for_programme(
  //   ctx.prisma,
  //   "TKDAT",
  //   2,
  //   1,
  //   "Tentamen",
  // );
  // console.log(res);
  // return;
  // const avg = await ctx.prisma.survey.findMany({});
  // console.log(avg.map((e) => e.answer_frequency).average());
  // return;

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

  // const user = await ctx.auth.createUser(
  //   "pDave",
  //   "david@davebay.net",
  //   "67t23d8ygbbqwodf38247bfweb437",
  // );
  // if (isSome(user)) {
  //   await ctx.auth.addRole(user.val, Role.Admin);
  // }

  UpdatePassratesByPeriod(ctx).start();
  UpdateChalmersSurveyAggregate(ctx).start();
  UpdateProgrammeSurveyAggregate(ctx).start();
  UpdateDepartmentSurveyAggregate(ctx).start();
  UpdateSurveyPerPeriod(ctx).start();

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
      `Webserver listening on ${chalk.red(ctx.config.host)}:${chalk.yellow(
        ctx.config.port,
      )}`,
    );
  });
};

main().catch((e) => console.error(e));
