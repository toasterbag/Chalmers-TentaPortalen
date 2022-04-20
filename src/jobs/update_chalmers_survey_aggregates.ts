import { Context } from "@app/context";
import { CronJob } from "cron";

export default (ctx: Context) => {
  return new CronJob(
    "0 0 0 * * *",
    async function () {
      const data = await ctx.prisma.survey.groupBy({
        _avg: {
          prerequisite_mean: true,
          goals_mean: true,
          structure_mean: true,
          teaching_mean: true,
          litterature_mean: true,
          assessment_mean: true,
          answer_frequency: true,
          administration_mean: true,
          workload_mean: true,
          working_environment_mean: true,
          total_impression_mean: true,
        },
        _count: {
          _all: true,
        },
        by: ["academic_year"],
        orderBy: {
          academic_year: "asc",
        },
      });

      const aggregate = data.reduce((agg, next) => {
        return {
          ...agg,
          [next.academic_year]: {
            ...next._avg,
            count: next._count._all,
          },
        };
      }, {});
      await ctx.redis_cache.chalmers_survey_aggregate.set(aggregate);
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
