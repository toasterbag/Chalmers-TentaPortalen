"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/programme/:code",
    handler: async ({ params }, { prisma }) => {
        const code = params.code;
        const data = await prisma.programme.findFirst({
            where: {
                code: code.toUpperCase(),
            },
        });
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=get.js.map