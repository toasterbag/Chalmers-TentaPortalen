"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/programme/:code/surveys",
    handler: async ({ params }, { prisma }) => {
        const code = params.code;
        const data = await prisma.$queryRaw `
    SELECT 
      academic_year, 
      AVG(prerequisite_mean) as prerequisite_mean,
      AVG(goals_mean) as goals_mean,
      AVG(course_structure_mean) as course_structure_mean,
      AVG(course_teaching_mean) as course_teaching_mean,
      AVG(course_litterature_mean) as course_litterature_mean,
      AVG(examination_mean) as examination_mean,
      AVG(administration_mean) as administration_mean,
      AVG(workload_mean) as workload_mean,
      AVG(working_environment_mean) as working_environment_mean,
      AVG(total_impression_mean) as total_impression_mean
    FROM surveys
    WHERE course_code IN 
      (SELECT course_code FROM courses WHERE owner_code=${code.toUpperCase()})
    GROUP BY academic_year
    ORDER BY academic_year;`;
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=surveys.js.map