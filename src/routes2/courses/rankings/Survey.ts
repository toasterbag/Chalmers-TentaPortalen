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

const schema = {
  path: "/courses/rankings/survey",
  method: Method.GET,
  auth: None,
  query: z.object({
    owner: z.string().optional().transform(emptyToUndefined),
    academicYear: z.string(),
    minResponses: z.string().optional().transform(parseNumber),
    maxResponses: z.string().optional().transform(parseNumber),
    startPeriod: z.string().optional().transform(parseNumber),
    endPeriod: z.string().optional().transform(parseNumber),
    programmePlan: z.string().optional().transform(emptyToUndefined),
    electivity: z.string().optional().transform(parseElectivity),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query }: Request<Schema>,
  { prisma }: Context,
) => {
  const {
    owner,
    academicYear,
    startPeriod,
    endPeriod,
    minResponses,
    maxResponses,
    programmePlan,
    electivity,
  } = query;

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

  const data = await prisma.common.survey.findMany({
    where: {
      AND: [
        {
          academic_year: academicYear,
          start_period: startPeriod,
          end_period: endPeriod,
          course: {
            owner_code: owner,
          },
        },
        {
          responses: {
            gte: minResponses,
          },
        },
        {
          responses: {
            lte: maxResponses,
          },
        },

        ...wheres,
      ],
    },
    orderBy: {
      total_impression_mean: "asc",
    },
  });

  return Ok(data);
};

export default new Endpoint(schema, handler);
