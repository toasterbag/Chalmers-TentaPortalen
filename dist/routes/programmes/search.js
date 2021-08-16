"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/programmes/search",
    handler: async ({ params }, { cache }) => {
        const academic_year = "2020/2021";
        return server_1.Ok((await cache.programmes_by_year.get())[academic_year]);
    },
};
//# sourceMappingURL=search.js.map