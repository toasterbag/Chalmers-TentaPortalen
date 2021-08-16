"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.POST,
    path: "/auth",
    auth: ["admin"],
    handler: async ({ body }, { config }) => {
        return server_1.Ok({});
    },
};
//# sourceMappingURL=auth.js.map