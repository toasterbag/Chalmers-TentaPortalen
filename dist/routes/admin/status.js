"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/admin/status",
    auth: ["admin"],
    handler: async ({ body }, { status }) => {
        return server_1.Ok(status);
    },
};
//# sourceMappingURL=status.js.map