import "./array";
import "./number";
import "./map";
import "./set";

declare global {
  function wait(t: number): Promise<void>;
  interface String {
    capitalize(): string;
  }
  interface Math {
    roundToTarget(values: Array<number>, decimals: number): Array<number>;
  }
}
export {};

global.wait = (t) =>
  new Promise((resolve) => {
    setTimeout(resolve, t);
  });

String.prototype.capitalize = function capitalize() {
  const head = this.slice(0, 1);
  const tail = this.slice(1);
  return head.toLocaleUpperCase() + tail;
};

Math.roundToTarget = function roundToTarget(numbers, target) {
  let err = target - numbers.map((x) => x.floor()).sum();
  return numbers
    .map((e, i) => [e, i])
    .sort(([a], [b]) => a.frac() - b.frac())
    .map(([x, _i], i) => {
      if (x === 0) err += 1;
      return [x === 0 ? 0 : x.floor() + (err > i ? 1 : 0), _i];
    })
    .sort(([, a], [, b]) => a - b)
    .map(([x]) => x);
};
