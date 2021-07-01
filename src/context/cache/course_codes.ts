import { Programme } from ".prisma/client";
import { Context } from "@app/context";
import { Cache } from "@app/context/cache";
import { differenceInHours } from "date-fns";

export type CacheType = Cache<Array<string>>;

const updater = async (ctx: Context) =>
  (await ctx.prisma.course.findMany({ select: { course_code: true } })).map(
    (e) => e.course_code,
  );

const wasOverOneHourAgo = (t: Date) => differenceInHours(t, new Date()) >= 1;

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "course codes",
    initial: [],
    updater,
    shouldUpdate: wasOverOneHourAgo,
    ctx,
  });
