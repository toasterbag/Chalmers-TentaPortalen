"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const study_portal_1 = require("../../import/study_portal");
exports.default = {
    method: server_1.Method.GET,
    path: "/admin/material/scan",
    handler: async ({ params }, ctx) => {
        await study_portal_1.scrape_everything(ctx);
        return server_1.Ok({});
    },
};
//# sourceMappingURL=trigger_survey_scan.js.map