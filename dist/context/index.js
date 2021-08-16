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
exports.Context = void 0;
const client_1 = require("@prisma/client");
// Caches
const LastUpdatedCache = __importStar(require("./cache/last_updated"));
const ProgrammesByYearCache = __importStar(require("./cache/programmes_by_year"));
const CourseCodesCache = __importStar(require("./cache/course_codes"));
const PassrateByPeriodCache = __importStar(require("./cache/passrate_by_period"));
const PassrateByPeriodAndYearCache = __importStar(require("./cache/passrate_by_period_and_year"));
class Progress {
    constructor(updated) {
        this.running = false;
        this.progress = 0;
        this.progress_target = 0;
        this.updated = updated;
    }
}
class Context {
    constructor(config) {
        this.prisma = new client_1.PrismaClient();
        this.prisma = new client_1.PrismaClient();
        this.config = config;
        this.status = {
            exam_statistics: new Progress(undefined),
            study_portal: new Progress(undefined),
        };
        this.cache = {
            last_updated: LastUpdatedCache.gen_cache(this),
            programmes_by_year: ProgrammesByYearCache.gen_cache(this),
            course_codes: CourseCodesCache.gen_cache(this),
            passrate_by_period: PassrateByPeriodCache.gen_cache(this),
            passrate_by_period_and_year: PassrateByPeriodAndYearCache.gen_cache(this),
        };
        // this.status = status;
    }
    static async initialize(config) {
        const ctx = new Context(config);
        for (const cache of Object.values(ctx.cache)) {
            cache.update();
        }
        const exam_datasheet_last_imported = await ctx.prisma.$queryRaw `
    SELECT completed FROM scans WHERE title='exam_statistics_datasheet' ORDER BY completed DESC LIMIT 1;`;
        const study_portal_last_imported = await ctx.prisma.$queryRaw `
    SELECT completed FROM scans WHERE title='study_portal' ORDER BY completed DESC LIMIT 1;`;
        ctx.status = {
            exam_statistics: new Progress(exam_datasheet_last_imported.length
                ? new Date(exam_datasheet_last_imported[0].completed)
                : undefined),
            study_portal: new Progress(study_portal_last_imported.length
                ? new Date(study_portal_last_imported[0].completed)
                : undefined),
        };
        return ctx;
    }
}
exports.Context = Context;
//# sourceMappingURL=index.js.map