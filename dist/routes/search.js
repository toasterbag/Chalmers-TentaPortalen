"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/search/:term",
    handler: async ({ params }, { prisma }) => {
        const term = params.term;
        const programmes_pending = prisma.programme.findMany({
            where: {
                OR: [
                    { code: { startsWith: term, mode: "insensitive" } },
                    { name_sv: { contains: term, mode: "insensitive" } },
                    { name_en: { contains: term, mode: "insensitive" } },
                ],
            },
        });
        const courses_pending = prisma.course.findMany({
            where: {
                OR: [
                    { course_code: { startsWith: term, mode: "insensitive" } },
                    { owner_code: { startsWith: term, mode: "insensitive" } },
                    { name_sv: { contains: term, mode: "insensitive" } },
                    { name_en: { contains: term, mode: "insensitive" } },
                ],
            },
            include: {
                exams: false,
            },
        });
        const departments_pending = prisma.department.findMany({});
        const [programmes, courses, departments] = await Promise.all([
            programmes_pending,
            courses_pending,
            departments_pending,
        ]);
        return server_1.Ok({ programmes, courses, departments });
    },
};
//# sourceMappingURL=search.js.map