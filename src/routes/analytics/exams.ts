import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { format, startOfToday, sub } from "date-fns";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/analytics/exams",

  handler: async (_: Request, { prisma }: Context): Promise<Response> => {
    const exams_with_thesis = await prisma.exam.count({
      where: {
        thesis: {
          isNot: null,
        },
      },
    });

    const total_exams = await prisma.exam.count({});

    const upload_metrics = await prisma.examThesis.findMany({
      where: {
        uploaded: {
          gte: sub(startOfToday(), { days: 30 }),
        },
      },
      select: {
        uploaded: true,
      },
    });
    const metrics_by_date = upload_metrics.groupBy((e) =>
      format(e.uploaded, "yyyy-MM-dd"),
    );

    const padded_metrics = new Array(30)
      .fill(0)
      .map((e, i): [string, number] => {
        const date = format(sub(startOfToday(), { days: i }), "yyyy-MM-dd");
        if (date in metrics_by_date) {
          return [date, metrics_by_date[date].length];
        }
        return [date, 0];
      })
      .sortBy(([a], [b]) => a.localeCompare(b));

    return Ok({
      exams_with_thesis,
      coverage: exams_with_thesis / total_exams,
      upload_metrics: padded_metrics,
    });
  },
};
