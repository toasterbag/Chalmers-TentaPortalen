import { Context } from "@app/context";
import { Survey } from "@app/prisma/clients/common";
import { CronJob } from "cron";

export default (ctx: Context) => {
  return new CronJob(
    "0 0 0 * * *",
    async function () {
      const data = await ctx.prisma.common.survey.findMany({
        include: {
          course: true,
        },
      });

      const byDepartment = data
        .groupBy((e) => String(e.course.department_id))
        .map(
          (programme_code, surveys): Array<[string, Array<Survey>]> =>
            surveys
              .groupBy((e) => e.academic_year)
              .pairs()
              .sortBy(([a], [b]) => a.localeCompare(b)),
        )
        .pairs()
        .reduce(
          (prog_agg, [programme_code, surveyByYear]) => ({
            ...prog_agg,
            [programme_code]: surveyByYear.reduce(
              (year_agg, [year, surveys]) => ({
                ...year_agg,
                [year]: {
                  count: surveys.length,
                  answer_frequency: surveys
                    .map((obj) => obj.answer_frequency)
                    .average(),
                  total_impression_mean: surveys
                    .map((obj) => obj.total_impression_mean)
                    .average(),
                  prerequisite_mean: surveys
                    .map((obj) => obj.prerequisite_mean)
                    .average(),
                  goals_mean: surveys.map((obj) => obj.goals_mean).average(),
                  structure_mean: surveys
                    .map((obj) => obj.structure_mean)
                    .average(),
                  teaching_mean: surveys
                    .map((obj) => obj.teaching_mean)
                    .average(),
                  assessment_mean: surveys
                    .map((obj) => obj.assessment_mean)
                    .average(),
                  litterature_mean: surveys
                    .map((obj) => obj.litterature_mean)
                    .average(),
                  administration_mean: surveys
                    .map((obj) => obj.administration_mean)
                    .average(),
                  workload_mean: surveys
                    .map((obj) => obj.workload_mean)
                    .average(),
                },
              }),
              {},
            ),
          }),
          {},
        );
      for (const [department, years] of Object.entries(byDepartment)) {
        await ctx.cache.department_survey_aggregate.set(
          department,
          JSON.stringify(years),
        );
      }
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
