import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { None } from "@app/std/option";
import {
  computePerformanceFields,
  WithPerformanceComputedFields,
} from "@app/prisma/exam";
import { Context } from "@app/context";
import { AcademicYear, aroundExamPeriod, isDefined } from "@app/utils";
import { zBoolean } from "@app/utils/validation";
import { CourseInstance, ModuleResult } from "@app/prisma/clients/common";

const schema = {
  path: "/course/:code/modules",
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

type AssessmentResult = {
  date: string;
  academic_year: string;
  failed: number;
  three: number;
  four: number;
  five: number;
  total: number;
  percent: {
    failed: number;
    three: number;
    four: number;
    five: number;
  };
};

const filterFollowupExams = (
  results: Array<AssessmentResult>,
  currentInstance: CourseInstance | null,
  filter: boolean,
): Array<AssessmentResult> => {
  if (filter) {
    // return Array.from(
    //   results
    //     .groupBy((e: { date: string }) =>
    //       AcademicYear.from_date(new Date(e.date)).toString(),
    //     )
    //     .map((_, resultsInYear) =>
    //       resultsInYear.reduce((a, b) => (a.total > b.total ? a : b)),
    //     )
    //     .values(),
    // );
    const assessmentsByYear = results
      .groupBy((e: { date: string }) =>
        AcademicYear.from_date(new Date(e.date)).toString(),
      )
      .map((id, examsInYear) =>
        examsInYear.reduce((a, b) => (a.total > b.total ? a : b)),
      )
      .filter((k, v) => isDefined(v));

    if (currentInstance) {
      const lastEntry = assessmentsByYear.get(currentInstance.academic_year);
      if (lastEntry) {
        const expectedExamPeriod = currentInstance.end_period;
        const actualExamPeriod = aroundExamPeriod(lastEntry.date);
        if (expectedExamPeriod !== actualExamPeriod) {
          assessmentsByYear.delete(currentInstance.academic_year);
        }
      }
    }
    return Array.from(assessmentsByYear.values());
  }
  return results;
};

const pickAssessmentFields = (
  module: WithPerformanceComputedFields<ModuleResult>,
) => ({
  academic_year: module.academic_year,
  failed: module.failed,
  three: module.three,
  four: module.four,
  five: module.five,
  total: module.total,
  percent: module.percent,
  date: module.date,
});

const handler: Handler = async (
  { params, query }: Request<Schema>,
  { prisma }: Context,
) => {
  const { code } = params;
  const modules = (
    await prisma.common.moduleResult.findMany({
      where: {
        course_code: code,
      },
      orderBy: {
        module_id: "asc",
      },
    })
  ).map(computePerformanceFields);

  const currentYear = AcademicYear.currentYear().toString();
  const currentInstance = await prisma.common.courseInstance.findFirst({
    where: { course_code: code, academic_year: currentYear },
  });

  const res = modules
    .groupBy((m) => m.module_id)
    .map((id, assessments) => ({
      name: assessments[0].name,
      module_id: assessments[0].module_id,
      grading_system: assessments[0].grading_system,
      points: assessments[0].points,
      results: filterFollowupExams(
        assessments.map(pickAssessmentFields),
        currentInstance,
        query.onlyPrimaries,
      ).sortBy((a, b) => b.date.localeCompare(a.date)),
    }));

  return Ok(Array.from(res.values()));
};

export default new Endpoint(schema, handler);
