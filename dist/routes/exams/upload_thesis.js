"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const z = __importStar(require("zod"));
const fs_extra_1 = require("fs-extra");
const query_schema = z.object({
    includes_solution: z.string(),
    course_code: z.string(),
    date: z.string(),
});
exports.default = {
    method: server_1.Method.POST,
    path: "/exams/thesis",
    uploads: { thesis: "single" },
    handler: async ({ query: unparsed_query, file }, { prisma, config }) => {
        const { course_code, date, includes_solution } = query_schema.parse(unparsed_query);
        if (!(typeof course_code == "string") || course_code.includes(".")) {
            return new server_1.Response(400, { code: "Invalid course code" });
        }
        if (!(typeof date == "string") || date.includes(".")) {
            return new server_1.Response(400, { code: "Invalid date" });
        }
        const exam = await prisma.exam.findFirst({
            where: {
                course_code: course_code,
                date: date,
            },
        });
        if (!exam) {
            return new server_1.Response(404, { code: "No such exam" });
        }
        if (exam.thesis_id) {
            return server_1.Ok({ code: "This exam already has a thesis been uploaded" });
        }
        const filetype = file.originalname.replace(/.*\./, "");
        const dir = `${config.paths.data}/courses/${course_code}/${date}`;
        await fs_extra_1.mkdir(dir, { recursive: true });
        await fs_extra_1.copyFile(file.path, `${dir}/exam.${filetype}`);
        const thesis = await prisma.examThesis.create({
            data: {
                filetype: filetype,
                includes_solution: includes_solution === "true" ? true : false,
            },
        });
        await prisma.exam.update({
            data: {
                thesis_id: thesis.id,
            },
            where: {
                course_code_date: {
                    course_code,
                    date,
                },
            },
        });
        return server_1.Ok();
    },
};
//# sourceMappingURL=upload_thesis.js.map