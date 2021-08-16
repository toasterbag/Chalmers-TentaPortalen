"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_cache = void 0;
const cache_1 = require("./");
const date_fns_1 = require("date-fns");
const updater = async (ctx) => {
    const programmes = (await ctx.prisma.programme.findMany({ select: { code: true } })).map((e) => e.code);
    const data = {};
    for (const owner of programmes) {
        const res = await ctx.prisma.$queryRaw `
    SELECT
      s.academic_year,
      SUM(s.respondents) as respondents,
      SUM(s.responses) as responses,
      AVG(s.answer_frequency) as answer_frequency,
      AVG(s.prerequisite_mean) as prerequisite_mean,
      AVG(s.goals_mean) as goals_mean,
      AVG(s.course_structure_mean) as course_structure_mean,
      AVG(s.course_teaching_mean) as course_teaching_mean,
      AVG(s.course_litterature_mean) as course_litterature_mean,
      AVG(s.examination_mean) as examination_mean,
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
const wasOverOneDayAgo = (t) => date_fns_1.differenceInHours(t, new Date()) >= 24;
const gen_cache = (ctx) => new cache_1.Cache({
    title: "programmes by year",
    initial: {},
    updater,
    shouldUpdate: wasOverOneDayAgo,
    ctx,
});
exports.gen_cache = gen_cache;
//# sourceMappingURL=programmes_by_year.js.map