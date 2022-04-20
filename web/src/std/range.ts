export const range = (a: number, b?: number) => {
  if (b) {
    return new Array(b).fill(0).map((e, i) => i + a);
  }
  return new Array(a).fill(0).map((e, i) => i);
};
