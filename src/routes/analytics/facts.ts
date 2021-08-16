import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/facts",

  handler: async (
    { params }: Request,
    { prisma, cache }: Context,
  ): Promise<Response> => {
    const grades = await prisma.exam.aggregate({
      _sum: {
        failed: true,
        three: true,
        four: true,
        five: true,
      },
    });

    const instances = await prisma.courseInstance.count({});

    const programmes = (await prisma.programme.findMany({})).map(async (p) => {
      return {
        ...p,
        ...(
          await prisma.exam.aggregate({
            _sum: {
              failed: true,
              three: true,
              four: true,
              five: true,
            },
            where: {
              course: {
                owner_code: p.code,
              },
              academic_year: {
                in: [
                  "2021/2022",
                  "2020/2021",
                  "2019/2020",
                  "2018/2019",
                  "2017/2018",
                ],
              },
            },
          })
        )._sum,
        ...(
          await prisma.survey.aggregate({
            _avg: {
              total_impression_mean: true,
            },
            where: {
              course: {
                owner_code: p.code,
              },
              academic_year: {
                in: [
                  "2021/2022",
                  "2020/2021",
                  "2019/2020",
                  "2018/2019",
                  "2017/2018",
                ],
              },
            },
          })
        )._avg,
      };
    });
    const programme_by_grade = (await Promise.all(programmes))
      .filter((p: any) => p.code.startsWith("TK"))
      .filter((p: any) => p.failed != null)
      .map((p: any) => {
        p.total = p.failed + p.three + p.four + p.five;
        p.failrate = p.failed.div(p.total).mul(100).round();
        return p;
      })
      .filter((p: any) => p.total > 100)

      .sort((a: any, b: any) => a.failrate - b.failrate);

    const programme_by_satisfaction = (await Promise.all(programmes))
      .map((p: any) => {
        p.total = p.failed + p.three + p.four + p.five;
        return p;
      })
      .filter((p: any) => p.total > 100)
      .filter((p: any) => p.total_impression_mean != null)
      .sort(
        (a: any, b: any) => a.total_impression_mean - b.total_impression_mean,
      );

    // const programme_grades = await prisma.$queryRaw`
    //   SELECT
    //     c.owner_code,
    //     SUM(e.failed) as failed,
    //     SUM(e.three) as threes,
    //     SUM(e.four) as fours,
    //     SUM(e.five) as fives,
    //     SUM(e.failed + e.three + e.four + e.five) as total,
    //     COUNT(DISTINCT c.course_code) as courses
    //   FROM courses c, exams e
    //   GROUP BY c.owner_code;`;

    return Ok({
      exams_written: grades._sum,
      course_instances: instances,
      programme_by_grade,
      programme_by_satisfaction,
    });
  },
};
