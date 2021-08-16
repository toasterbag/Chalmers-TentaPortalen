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
const node_path_1 = require("node:path");
const z = __importStar(require("zod"));
const fs_extra_1 = require("fs-extra");
const common_schema = z.object({
    thesis_id: z.number(),
    verified: z.boolean(),
});
const approve_schema = z.object({
    courses: z.array(z.string()),
    uploaded_for: z.string(),
    verified: z.boolean(),
    includes_solution: z.boolean(),
    thesis_id: z.number(),
    date: z.string(),
});
exports.default = {
    method: server_1.Method.PUT,
    path: "/exams/thesis",
    auth: ["admin"],
    handler: async ({ body: unparsed_body }, { prisma, config }) => {
        const body = common_schema.parse(unparsed_body);
        if (body.verified == false) {
            const thesis = await prisma.examThesis.delete({
                where: {
                    id: body.thesis_id,
                },
                include: {
                    exams: true,
                },
            });
            for (const exam of thesis.exams) {
                const file = node_path_1.join(config.paths.data, "courses", exam.course_code, `exam.${thesis.filetype}`);
                await fs_extra_1.unlink(file);
            }
        }
        else {
            const approve = approve_schema.parse(unparsed_body);
            const thesis = await prisma.examThesis.update({
                data: {
                    includes_solution: approve.includes_solution,
                    verified: true,
                },
                where: {
                    id: approve.thesis_id,
                },
            });
            for (const course_code of approve.courses) {
                await prisma.exam.update({
                    data: {
                        thesis_id: null,
                    },
                    where: {
                        course_code_date: {
                            course_code: course_code,
                            date: approve.date,
                        },
                    },
                });
                await prisma.exam.update({
                    data: {
                        thesis_id: approve.thesis_id,
                    },
                    where: {
                        course_code_date: {
                            course_code: course_code,
                            date: approve.date,
                        },
                    },
                });
                const filename = `exam.${thesis.filetype}`;
                const src = node_path_1.join(config.paths.data, "courses", approve.uploaded_for, approve.date);
                const dest = node_path_1.join(config.paths.data, "courses", course_code, approve.date);
                await fs_extra_1.mkdir(dest, { recursive: true });
                fs_extra_1.copyFile(node_path_1.join(src, filename), node_path_1.join(dest, filename));
            }
        }
        return server_1.Ok();
    },
};
//# sourceMappingURL=approve_thesis.js.map