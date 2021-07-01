import { Programme } from ".prisma/client";
import { Context } from "@app/context";
import { Cache } from "@app/context/cache";
import { differenceInHours } from "date-fns";

export type CacheType = Cache<Date>;

const updater = async (ctx: Context) =>
  (await ctx.prisma.scan.findFirst({}))?.completed ?? new Date(2020, 1);

const wasOverOneHourAgo = (t: Date) => differenceInHours(t, new Date()) >= 1;

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "last updated",
    initial: new Date(2020, 1),
    updater,
    shouldUpdate: wasOverOneHourAgo,
    ctx,
  });
