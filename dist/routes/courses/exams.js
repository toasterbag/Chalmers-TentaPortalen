"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/course/:code/exams",
    handler: async ({ params }, { prisma }) => {
        const code = params.code;
        const data = await prisma.exam.findMany({
            where: {
                course_code: code.toUpperCase(),
            },
            include: {
                thesis: true,
                solution: true,
            },
            orderBy: { date: "desc" },
        });
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=exams.js.map