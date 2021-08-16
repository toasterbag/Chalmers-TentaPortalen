"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const fs_extra_1 = require("fs-extra");
const exams_stats_1 = __importDefault(require("../../import/exams_stats"));
exports.default = {
    method: server_1.Method.PUT,
    path: "/datasheet",
    uploads: {
        datasheet: "single",
    },
    auth: ["admin"],
    handler: async ({ headers, file }, ctx) => {
        console.log(file);
        await fs_extra_1.copyFile(file.path, ctx.config.paths.exam_sheet_temp);
        exams_stats_1.default(ctx);
        return server_1.Ok({});
    },
};
//# sourceMappingURL=upload_exam_sheet.js.map