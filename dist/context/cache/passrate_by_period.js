"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_cache = void 0;
const cache_1 = require("./");
const date_fns_1 = require("date-fns");
const get_dates = async (ctx, is_exam, study_period) => {
    return ctx.prisma.period.findMany({
        select: {
            start: true,
            end: true,
        },
        where: {
            type: is_exam ? "Exam period" : "Re-exam period",
            study_period,
        },
    });
};
const filter_exams = (dates, exams) => {
    return exams
        .filter((exam) => {
        for (const { start, end } of dates) {
            if (date_fns_1.isWithinInterval(new Date(exam.date), { start, end })) {
                return true;
            }
        }
        return false;
    })
        .reduce((count, exam) => {
        count.failed += exam.failed;
        count.three += exam.three;
        count.four += exam.four;
        count.five += exam.five;
        return count;
    }, { failed: 0, three: 0, four: 0, five: 0 });
};
const updater = async (ctx) => {
    const exams = await ctx.prisma.exam.findMany({});
    return {
        sp_1_exams: filter_exams(await get_dates(ctx, true, 1), exams),
        sp_2_exams: filter_exams(await get_dates(ctx, true, 2), exams),
        sp_3_exams: filter_exams(await get_dates(ctx, true, 3), exams),
        sp_4_exams: filter_exams(await get_dates(ctx, true, 4), exams),
        august_re_exams: filter_exams(await get_dates(ctx, false, 0), exams),
        october_re_exams: filter_exams(await get_dates(ctx, false, 1), exams),
        january_re_exams: filter_exams(await get_dates(ctx, false, 2), exams),
        easter_re_exams: filter_exams(await get_dates(ctx, false, 3), exams),
        june_re_exams: filter_exams(await get_dates(ctx, false, 4), exams),
    };
};
const wasOverOneDayAgo = (t) => date_fns_1.differenceInHours(t, new Date()) >= 24;
const gen_cache = (ctx) => new cache_1.Cache({
    title: "Passrate by exam period",
    // I know this is horrible
    initial: {
        sp_1_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        sp_2_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        sp_3_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        sp_4_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        august_re_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        october_re_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        january_re_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        easter_re_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
        june_re_exams: {
            failed: 0,
            three: 0,
            four: 0,
            five: 0,
        },
    },
    updater,
    shouldUpdate: wasOverOneDayAgo,
    ctx,
});
exports.gen_cache = gen_cache;
//# sourceMappingURL=passrate_by_period.js.map