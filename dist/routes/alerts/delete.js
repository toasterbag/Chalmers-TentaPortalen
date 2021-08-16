"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.DELETE,
    path: "/alerts/:id",
    auth: ["admin"],
    handler: async ({ params }, { prisma }) => {
        const alerts = await prisma.alerts.delete({
            where: {
                id: Number(params.id),
            },
        });
        return server_1.Ok(alerts);
    },
};
//# sourceMappingURL=delete.js.map