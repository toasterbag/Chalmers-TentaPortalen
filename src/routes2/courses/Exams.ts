import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import { computePerformanceFields } from "@app/prisma/exam";
import { AcademicYear, aroundExamPeriod, isDefined, second } from "@app/utils";
import { zBoolean } from "@app/utils/validation";

const schema = {
  path: "/course/:code/exams",
  method: Method.GET,
  auth: None,
  params: z.object({
    code: z.string(),
  }),
  query: z.object({
    onlyPrimaries: zBoolean,
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params, query }: Request<Schema>,
  { prisma }: Context,
) => {
  const { code } = params;
  const exams = (
    await prisma.common.exam.findMany({
      where: {
        course_code: code.toUpperCase(),
      },
      include: {
        thesis: true,
        solution: true,
      },
      orderBy: { date: "desc" },
    })
  ).map(computePerformanceFields);

  if (query.onlyPrimaries) {
    const examsByYear = exams
      .groupBy((e: { date: string }) =>
        AcademicYear.from_date(new Date(e.date)).toString(),
      )
      .map((id, examsInYear) =>
        examsInYear.reduce((a, b) => (a.total > b.total ? a : b)),
      )
      .filter((k, v) => isDefined(v));

    const currentYear = AcademicYear.currentYear().toString();
    const currentInstance = await prisma.common.courseInstance.findFirst({
      where: { course_code: code, academic_year: currentYear },
    });

    const lastEntry = examsByYear.get(currentYear);
    if (currentInstance && lastEntry) {
      const expectedExamPeriod = currentInstance.end_period;
      const actualExamPeriod = aroundExamPeriod(lastEntry.date);
      if (expectedExamPeriod !== actualExamPeriod) {
        examsByYear.delete(currentYear);
      }
    }

    return Ok(examsByYear.pairs().map(second));
  }

  return Ok(exams);
};

export default new Endpoint(schema, handler);
