import { Context } from "@app/context";
import { scrape_everything } from "@app/import/study_portal";
import { CronJob } from "cron";

export const ScrapeStudentPortal = (ctx: Context) => {
  return new CronJob(
    "0 0 7 * * 1",
    async () => {
      await scrape_everything(ctx);
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
