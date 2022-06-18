import { z } from "zod";

export const zBoolean = z
  .enum(["true", "false"])
  .default("false")
  .transform((b) => b === "true");

export const parseNumber = (str: string | undefined) => {
  const n = Number(str);
  return Number.isNaN(n) ? undefined : n;
};

export const emptyToUndefined = (str: string | undefined) =>
  str?.length !== 0 ? str : undefined;
