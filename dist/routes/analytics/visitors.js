"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
exports.default = {
    method: server_1.Method.GET,
    path: "/metrics/visitors",
    handler: async (req, { prisma }) => {
        const data = await prisma.$queryRaw `
    SELECT timestamp::date AS date, COUNT(DISTINCT cookie) as count
    FROM log
    WHERE 
      timestamp BETWEEN 
      now() - interval '30 days' AND now()
    GROUP BY date
    ORDER BY date ASC;`;
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=visitors.js.map