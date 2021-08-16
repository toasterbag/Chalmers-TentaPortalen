"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/exams/pending",
    auth: ["admin"],
    handler: async ({ params }, { prisma }) => {
        const where = {
            OR: [
                {
                    thesis: {
                        verified: {
                            equals: false,
                        },
                    },
                },
                {
                    solution: {
                        verified: {
                            equals: false,
                        },
                    },
                },
            ],
        };
        const exams = await prisma.exam.findMany({
            where,
            include: {
                thesis: true,
                solution: true,
            },
        });
        const count = await prisma.exam.count({
            where,
        });
        return server_1.Ok({ count, exams });
    },
};
//# sourceMappingURL=pending.js.map