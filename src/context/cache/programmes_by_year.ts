import { Context } from "@app/context";
import { Cache } from "@app/context/cache";
import { Programme } from "@app/prisma/clients/common";

export type CacheType = Cache<{ [id: string]: Programme }>;

const updater = async ({ prisma }: Context) => {
  const programmes = (
    await prisma.common.programme.findMany({ select: { code: true } })
  ).map((e) => e.code);
  const data: any = {};
  for (const owner of programmes) {
    const res: any = await prisma.common.$queryRaw`
    SELECT
      s.academic_year,
      SUM(s.respondents) as respondents,
      SUM(s.responses) as responses,
      AVG(s.answer_frequency) as answer_frequency,
      AVG(s.prerequisite_mean) as prerequisite_mean,
      AVG(s.goals_mean) as goals_mean,
      AVG(s.structure_mean) as structure_mean,
      AVG(s.teaching_mean) as teaching_mean,
      AVG(s.litterature_mean) as litterature_mean,
      AVG(s.assessment_mean) as examination_mean,
      AVG(s.administration_mean) as administration_mean,
      AVG(s.workload_mean) as workload_mean,
      AVG(s.working_environment_mean) as working_environment_mean,
      AVG(s.total_impression_mean) as total_impression_mean,
      SUM(e.failed) as failed,
      SUM(e.three) as threes,
      SUM(e.four) as fours,
      SUM(e.five) as fives,
      SUM(e.failed + e.three + e.four + e.five) as total_grades,
      COUNT(DISTINCT c.course_code) as courses
    FROM courses c, surveys s, exams e
    WHERE
      c.course_code = s.course_code
      AND c.course_code = e.course_code
      AND s.academic_year = e.academic_year
      AND c.owner_code = ${owner}
    GROUP BY s.academic_year
    ORDER BY s.academic_year DESC;`;
    for (const row of res) {
      if (!(row.academic_year in data)) {
        data[row.academic_year] = [];
      }
      row.code = owner;
      data[row.academic_year].push(row);
    }
  }
  return data;
};

const DAILY = 1000 * 60 * 60 * 24;

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "Programmes by year",
    initial: new Map(),
    updateInterval: DAILY,
    updater: () => updater(ctx),
  });
