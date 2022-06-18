/* eslint-disable no-param-reassign */

import { Exam, ModuleResult } from "./clients/common";

export type WithPerformanceComputedFields<T> = T & {
  total: number;
  percent: {
    failed: number;
    three: number;
    four: number;
    five: number;
  };
};

export const computePerformanceFields = <T extends Exam | ModuleResult>(
  assesment: T,
): WithPerformanceComputedFields<T> => {
  const total =
    assesment.failed + assesment.three + assesment.four + assesment.five;

  const percentages = [
    assesment.failed,
    assesment.three,
    assesment.four,
    assesment.five,
  ].map((e) => e.div(total).mul(100));
  const [failed, three, four, five] = Math.roundToTarget(percentages, 100);

  const percent = {
    failed,
    three,
    four,
    five,
  };

  return { ...assesment, percent, total };
};
