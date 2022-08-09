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
import { parseElectivity } from "@app/prisma/electivity";
import { emptyToUndefined, parseNumber } from "@app/utils/validation";
import { second } from "@app/utils";
import { computePerformanceFields } from "@app/prisma/exam";

const schema = {
  path: "/courses/rankings/performance",
  method: Method.GET,
  auth: None,
  query: z.object({
    owner: z.string().optional().transform(emptyToUndefined),
    academicYear: z.string(),
    programmePlan: z.string().optional().transform(emptyToUndefined),
    startPeriod: z.string().optional().transform(parseNumber),
    endPeriod: z.string().optional().transform(parseNumber),
    electivity: z.string().optional().transform(parseElectivity),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query }: Request<Schema>,
  { prisma }: Context,
) => {
  const { owner, academicYear, programmePlan, electivity } = query;

  const wheres = [];
  if (programmePlan) {
    const coursesInPlan = await prisma.common.programmePlanEntry.findMany({
      select: {
        course_code: true,
      },
      where: {
        programme_code: programmePlan,
        electivity,
      },
    });
    wheres.push({
      course_code: {
        in: coursesInPlan.map((e) => e.course_code),
      },
    });
  }

  const data = (
    await prisma.common.exam.findMany({
      where: {
        AND: [
          {
            academic_year: academicYear,
          },
          {
            course: {
              owner_code: owner,
            },
          },

          ...wheres,
        ],
      },
      include: {
        course: {
          select: {
            name_en: true,
            name_sv: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    })
  )
    .map(computePerformanceFields)
    .groupBy((e) => e.course_code)
    .map((code, exams) => exams.sortDescending((x) => x.total).first())
    .pairs()
    .map(second);

  return Ok(data);
};

export default new Endpoint(schema, handler);
