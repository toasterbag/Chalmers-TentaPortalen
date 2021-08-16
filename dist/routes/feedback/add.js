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
const body_schema = z.object({
    email: z.string().optional(),
    message: z.string(),
});
exports.default = {
    method: server_1.Method.POST,
    path: "/feedback",
    handler: async ({ body: unparsed_body }, { prisma }) => {
        const body = body_schema.parse(unparsed_body);
        await prisma.feedback.create({
            data: {
                email: body.email ?? "anonymous",
                message: body.message,
            },
        });
        return server_1.Ok({});
    },
};
//# sourceMappingURL=add.js.map