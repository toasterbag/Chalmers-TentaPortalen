"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/feedback",
    auth: ["admin"],
    handler: async ({ params }, { prisma }) => {
        return server_1.Ok(await prisma.feedback.findMany({}));
    },
};
//# sourceMappingURL=get.js.map