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
const query_schema = z.object({
    programme: z
        .string()
        .optional()
        .transform((s) => (s == "" ? undefined : s)),
    academic_year: z.string(),
    min_responses: z
        .string()
        .optional()
        .transform(Number)
        .transform((n) => (isNaN(n) ? undefined : n)),
    max_responses: z
        .string()
        .optional()
        .transform(Number)
        .transform((n) => (isNaN(n) ? undefined : n)),
});
exports.default = {
    method: server_1.Method.GET,
    path: "/courses/search",
    handler: async ({ query: unparsed_query }, { prisma }) => {
        const { programme, academic_year, min_responses, max_responses, } = query_schema.parse(unparsed_query);
        const data = await prisma.survey.findMany({
            where: {
                AND: [
                    {
                        academic_year,
                    },
                    {
                        course: {
                            owner_code: programme,
                        },
                    },
                    {
                        responses: {
                            gte: min_responses,
                        },
                    },
                    {
                        responses: {
                            lte: max_responses,
                        },
                    },
                ],
            },
            orderBy: {
                total_impression_mean: "asc",
            },
        });
        return server_1.Ok(data);
    },
};
//# sourceMappingURL=search.js.map