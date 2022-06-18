import { Context } from "@app/context";
import { Cache } from "@app/context/cache";

export type CacheType = Cache<Array<string>>;

const HOURLY = 1000 * 60 * 60;

const updater = async (ctx: Context) =>
  (await ctx.prisma.common.course.findMany({ select: { course_code: true } })).map(
    (e) => e.course_code,
  );

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "course codes",
    initial: [],
    updateInterval: HOURLY,
    updater: () => updater(ctx),
  });
