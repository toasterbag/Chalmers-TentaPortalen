import { Context } from "@app/context";
import { Survey } from "@app/prisma/clients/common";
import { CronJob } from "cron";

// const sumSurveys = (surveys: Array<Survey>) =>
//   surveys.reduce(
//     (total, next) => ({
//       count: total.count + 1,
//       respondents: total.respondents + next.respondents,
//       responses: total.respondents + next.respondents,
//       answer_frequency: total.answer_frequency + next.answer_frequency,
//       total_impression_mean:
//         total.total_impression_mean + next.total_impression_mean,
//       prerequisite_mean: total.prerequisite_mean + next.prerequisite_mean,
//       goals_mean: total.goals_mean + next.goals_mean,
//       structure_mean: total.structure_mean + next.structure_mean,
//       teaching_mean: total.teaching_mean + next.teaching_mean,
//       assessment_mean: total.assessment_mean + next.assessment_mean,
//       litterature_mean: total.litterature_mean + next.litterature_mean,
//       administration_mean: total.administration_mean + next.administration_mean,
//       workload_mean: total.workload_mean + next.workload_mean,
//     }),
//     {
//       count: 0,
//       respondents: 0,
//       responses: 0,
//       answer_frequency: 0,
//       total_impression_mean: 0,
//       prerequisite_mean: 0,
//       goals_mean: 0,
//       structure_mean: 0,
//       teaching_mean: 0,
//       assessment_mean: 0,
//       litterature_mean: 0,
//       administration_mean: 0,
//       workload_mean: 0,
//     },
//   );

// const aggregateSurveys = (surveys: Array<Survey>) => {
//   const summed = sumSurveys(surveys);
//   for (const key of Object.keys(summed)) {
//     const k: keyof ReturnType<typeof sumSurveys> = key as any;
//     summed[k] /= summed.count;
//   }
// };

export default (ctx: Context) => {
  return new CronJob(
    "0 0 0 * * *",
    async function () {
      // const programmes = await ctx.prisma.common.programme.findMany({
      //   include: {
      //     courses: {
      //       include: {
      //         surveys: true,
      //         exams: true,
      //       },
      //     },
      //   },
      // });

      // programmes.map((p) => {
      //   const allSurveys = p.courses.flatMap((c) => c.surveys);
      //   const surveys = allSurveys
      //     .groupBy((s) => s.academic_year)
      //     .map((year, s) => aggregateSurveys(s));

      //   const allExams =
      //   return {
      //     surveys,
      //     exams,
      //   };
      // });

      const data = await ctx.prisma.common.survey.findMany({
        include: {
          course: true,
        },
      });

      const byProgramme = data
        .groupBy((e) => e.course.owner_code)
        .map((programme_code, surveys): Array<[string, Array<Survey>]> => {
          return surveys
            .groupBy((e) => e.academic_year)
            .pairs()
            .sortBy(([a], [b]) => a.localeCompare(b));
        })
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
      ctx.cache.programme_survey_aggregate.set(byProgramme);
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
