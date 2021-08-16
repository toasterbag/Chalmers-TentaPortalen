"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/periods/passrate/:start/:end",
    handler: async ({ params }, { cache }) => {
        return server_1.Ok((await cache.passrate_by_period_and_year.get()).get(`${params.start}/${params.end}`));
    },
};
//# sourceMappingURL=passrate_by_year.js.map