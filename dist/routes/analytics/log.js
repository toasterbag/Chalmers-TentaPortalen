"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.POST,
    path: "/doit",
    handler: async ({ headers, body }, { prisma }) => {
        let ip = headers["x-forwarded-for"] ?? "anonymous";
        if (!body.token) {
            body.token = "anonymous";
            ip = "anonymous";
        }
        await prisma.log.create({
            data: {
                page: body.page ?? "unknown",
                event: body.event ?? "unknown",
                data: body.data ?? "None",
                cookie: body.token,
                ip,
            },
        });
        return server_1.Ok({});
    },
};
//# sourceMappingURL=log.js.map