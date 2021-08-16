"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/facts",
    handler: async ({ params }, { prisma, cache }) => {
        const grades = await prisma.exam.aggregate({
            _sum: {
                failed: true,
                three: true,
                four: true,
                five: true,
            },
        });
        const instances = await prisma.courseInstance.count({});
        const programmes = (await prisma.programme.findMany({})).map(async (p) => {
            return {
                ...p,
                ...(await prisma.exam.aggregate({
                    _sum: {
                        failed: true,
                        three: true,
                        four: true,
                        five: true,
                    },
                    where: {
                        course: {
                            owner_code: p.code,
                        },
                        academic_year: {
                            in: [
                                "2021/2022",
                                "2020/2021",
                                "2019/2020",
                                "2018/2019",
                                "2017/2018",
                            ],
                        },
                    },
                }))._sum,
                ...(await prisma.survey.aggregate({
                    _avg: {
                        total_impression_mean: true,
                    },
                    where: {
                        course: {
                            owner_code: p.code,
                        },
                        academic_year: {
                            in: [
                                "2021/2022",
                                "2020/2021",
                                "2019/2020",
                                "2018/2019",
                                "2017/2018",
                            ],
                        },
                    },
                }))._avg,
            };
        });
        const programme_by_grade = (await Promise.all(programmes))
            .filter((p) => p.code.startsWith("TK"))
            .filter((p) => p.failed != null)
            .map((p) => {
            p.total = p.failed + p.three + p.four + p.five;
            p.failrate = p.failed.div(p.total).mul(100).round();
            return p;
        })
            .filter((p) => p.total > 100)
            .sort((a, b) => a.failrate - b.failrate);
        const programme_by_satisfaction = (await Promise.all(programmes))
            .map((p) => {
            p.total = p.failed + p.three + p.four + p.five;
            return p;
        })
            .filter((p) => p.total > 100)
            .filter((p) => p.total_impression_mean != null)
            .sort((a, b) => a.total_impression_mean - b.total_impression_mean);
        // const programme_grades = await prisma.$queryRaw`
        //   SELECT
        //     c.owner_code,
        //     SUM(e.failed) as failed,
        //     SUM(e.three) as threes,
        //     SUM(e.four) as fours,
        //     SUM(e.five) as fives,
        //     SUM(e.failed + e.three + e.four + e.five) as total,
        //     COUNT(DISTINCT c.course_code) as courses
        //   FROM courses c, exams e
        //   GROUP BY c.owner_code;`;
        return server_1.Ok({
            exams_written: grades._sum,
            course_instances: instances,
            programme_by_grade,
            programme_by_satisfaction,
        });
    },
};
//# sourceMappingURL=facts.js.map