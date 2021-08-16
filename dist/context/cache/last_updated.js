"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_cache = void 0;
const cache_1 = require("./");
const date_fns_1 = require("date-fns");
const updater = async (ctx) => (await ctx.prisma.scan.findFirst({}))?.completed ?? new Date(2020, 1);
const wasOverOneHourAgo = (t) => date_fns_1.differenceInHours(t, new Date()) >= 1;
const gen_cache = (ctx) => new cache_1.Cache({
    title: "last updated",
    initial: new Date(2020, 1),
    updater,
    shouldUpdate: wasOverOneHourAgo,
    ctx,
});
exports.gen_cache = gen_cache;
//# sourceMappingURL=last_updated.js.map