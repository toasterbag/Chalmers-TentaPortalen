export { range } from "./range";

export const isDefined = <T>(item: T | undefined): item is T => {
  return item !== undefined;
};

export const isNotNull = <T>(item: T | null): item is T => {
  return item !== null;
};
