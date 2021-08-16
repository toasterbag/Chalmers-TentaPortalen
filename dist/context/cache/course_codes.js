"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_cache = void 0;
const cache_1 = require("./");
const date_fns_1 = require("date-fns");
const updater = async (ctx) => (await ctx.prisma.course.findMany({ select: { course_code: true } })).map((e) => e.course_code);
const wasOverOneHourAgo = (t) => date_fns_1.differenceInHours(t, new Date()) >= 1;
const gen_cache = (ctx) => new cache_1.Cache({
    title: "course codes",
    initial: [],
    updater,
    shouldUpdate: wasOverOneHourAgo,
    ctx,
});
exports.gen_cache = gen_cache;
//# sourceMappingURL=course_codes.js.map