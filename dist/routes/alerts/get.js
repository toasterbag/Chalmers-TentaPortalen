"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/alerts",
    handler: async (req, { prisma }) => {
        const alerts = await prisma.alerts.findMany({
            where: {
                start: {
                    gte: new Date(),
                },
                end: {
                    lte: new Date(),
                },
            },
        });
        return server_1.Ok(alerts);
    },
};
//# sourceMappingURL=get.js.map