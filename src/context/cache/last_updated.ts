import { Context } from "@app/context";
import { Cache } from "@app/context/cache";

export type CacheType = Cache<Date>;

const HOURLY = 1000 * 60 * 60;

const updater = async (ctx: Context) =>
  (await ctx.prisma.scan.findFirst({}))?.completed ?? new Date(2020, 1);

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "course codes",
    initial: new Date(),
    updateInterval: HOURLY,
    updater: () => updater(ctx),
  });
