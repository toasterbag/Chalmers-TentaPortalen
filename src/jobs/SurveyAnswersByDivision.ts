import { Context } from "@app/context";
import { Survey } from "@app/prisma/clients/common";
import { CronJob } from "cron";

export default (ctx: Context) => {
  return new CronJob(
    "0 0 0 * * *",
    async function SurveyAnswersByDivision() {
      // const data = await ctx.prisma.common.survey.findMany({
      //   include: {
      //     course: true,
      //   },
      // });
      // const byProgramme = data
      //   .groupBy((e) => e.course.owner_code)
      //   .map((programme_code, surveys): Array<[string, Array<Survey>]> => {
      //     return surveys
      //       .groupBy((e) => e.academic_year)
      //       .pairs()
      //       .sortBy(([a], [b]) => a.localeCompare(b));
      //   })
      //   .pairs()
      //   .reduce(
      //     (prog_agg, [programme_code, surveyByYear]) => ({
      //       ...prog_agg,
      //       [programme_code]: surveyByYear.reduce(
      //         (year_agg, [year, surveys]) => ({
      //           ...year_agg,
      //           [year]: surveys.map((obj) => obj.answer_frequency).average(),
      //         }),
      //         {},
      //       ),
      //     }),
      //     {},
      //   );
      // ctx.cache.programme_survey_aggregate.set(byProgramme);
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
