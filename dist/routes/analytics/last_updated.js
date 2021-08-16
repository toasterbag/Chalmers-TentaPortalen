"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/updated",
    handler: async ({ params }, { cache }) => {
        return server_1.Ok({ timestamp: await cache.last_updated.get() });
    },
};
//# sourceMappingURL=last_updated.js.map