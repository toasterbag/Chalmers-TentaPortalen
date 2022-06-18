export const range = (
  a: number,
  b?: number,
  conf?: { inclusive?: boolean },
) => {
  let append = 0;
  if (conf && conf.inclusive) append = 1;
  if (b) {
    if (b > a) {
      return new Array(b - a + append).fill(0).map((e, i) => i + a);
    }
    return new Array(a - b + append).fill(0).map((e, i) => a - i);
  }
  return new Array(a + append).fill(0).map((e, i) => i);
};
