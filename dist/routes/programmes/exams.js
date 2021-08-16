"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/programme/:code/exams",
    handler: async ({ params }, { prisma }) => {
        const code = params.code;
        const data = await prisma.$queryRaw `
    SELECT 
      academic_year, 
      SUM(failed) as failed,
      SUM(three) as three,
      SUM(four) as four,
      SUM(five) as five,
      SUM(failed + three + four + five) as total
    FROM exams
    WHERE course_code IN 
      (SELECT course_code FROM courses WHERE owner_code=${code.toUpperCase()})
    GROUP BY academic_year
    ORDER BY academic_year;`;
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=exams.js.map