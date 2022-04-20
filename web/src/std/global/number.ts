declare global {
  interface Number {
    abs(): number;
    round(): number;
    roundTo(decimalPlaces: number): number;
    floor(): number;
    ceil(): number;
    trunc(): number;
    frac(): number;
    min(...args: number[]): number;
    max(...args: number[]): number;

    add(rhs: number): number;
    sub(rhs: number): number;
    mul(rhs: number): number;
    div(rhs: number): number;
    rem(rhs: number): number;
  }
}
export { };

Number.prototype.roundTo = function roundTo(decimalPlaces) {
  return Number(
    `${Math.round(
      Number(`${this.valueOf()}e${decimalPlaces}`),
    )}e-${decimalPlaces}`,
  );
};

Number.prototype.trunc = function trunc() {
  return Math.trunc(this.valueOf());
};

Number.prototype.frac = function frac() {
  return this.valueOf() % 1;
};

Number.prototype.round = function round() {
  return Math.round(this.valueOf());
};

Number.prototype.floor = function floor() {
  return Math.floor(this.valueOf());
};

Number.prototype.ceil = function ceil() {
  return Math.ceil(this.valueOf());
};

Number.prototype.min = function (...args: number[]) {
  return Math.min(this.valueOf(), ...args);
};

Number.prototype.max = function (...args: number[]) {
  return Math.max(this.valueOf(), ...args);
};

Number.prototype.add = function add(rhs: number) {
  return this.valueOf() + rhs;
};

Number.prototype.sub = function sub(rhs: number) {
  return this.valueOf() - rhs;
};

Number.prototype.mul = function mul(rhs: number) {
  return this.valueOf() * rhs;
};

Number.prototype.div = function div(rhs: number) {
  return this.valueOf() / rhs;
};

Number.prototype.rem = function rem(rhs: number) {
  return this.valueOf() % rhs;
};

Number.prototype.abs = function abs() {
  return Math.abs(this.valueOf());
};
