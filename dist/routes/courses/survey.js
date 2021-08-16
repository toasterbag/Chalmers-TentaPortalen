"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/course/:code/survey",
    handler: async ({ params }, { prisma }) => {
        const code = params.code;
        const data = await prisma.survey.findMany({
            where: { course_code: code.toUpperCase() },
            orderBy: [{ academic_year: "asc" }, { start_period: "asc" }],
        });
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=survey.js.map