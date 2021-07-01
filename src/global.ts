declare global {
  function wait(t: number): Promise<void>;
  function range(a: number, b?: number): Iterable<number>;

  interface Number {
    abs(): number;
    round(): number;
    roundTo(decimalPlaces: number): number;
    floor(): number;
    ceil(): number;
    trunc(): number;
    frac(): number;

    add(rhs: number): number;
    sub(rhs: number): number;
    mul(rhs: number): number;
    div(rhs: number): number;
    rem(rhs: number): number;
  }

  interface Array<T> {
    take(n: number): Array<T>;
    sum(): Array<T>;
    min(): number;
    max(): number;
    first(): T;
    last(): T;
    random(): T;
    isEmpty(): boolean;
    inspect(fn: (x: T) => void): Array<T>;

    unique(): Array<T>;
    without(filter: Array<T>): Array<T>;

    await_map<T, O>(
      fn: (x: T, i: number, self: Array<T>) => O,
    ): Promise<Array<O>>;

    // parallel<T, O>(
    //   fn: (x: T, i: number, self: Array<Promise<T>>) => O
    // ): Array<Promise<O>>;
  }

  interface String {
    capitalize(): string;
  }
}
export {};

function* range_iter(start: number, end: number) {
  let i = start;
  while (i < end) {
    yield i++;
  }
}

global.range = (a: number, b?: number) => {
  if (b) {
    return range_iter(a, b);
  }
  return range_iter(0, a);
};

global.wait = (t) => new Promise((resolve) => setTimeout(resolve, t));

// BigInt.parse = function (number: string, radix: number) {
//   return [...number.toString()].reduce(
//     (r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)),
//     0n
//   );
// };

// BigInt.parseBase36 = function (number: string) {
//   return BigInt.parse(number, 36);
// };

// BigInt.parse = function (s: string): bigint {
//   return BigInt(s.substr(0, s.length - 1));
// };

// Number

Number.prototype.roundTo = function (decimalPlaces) {
  return Number(
    Math.round(Number(this.valueOf() + "e" + decimalPlaces)) +
      "e-" +
      decimalPlaces,
  );
};

Number.prototype.trunc = function () {
  return Math.trunc(this.valueOf());
};

Number.prototype.frac = function () {
  return this.valueOf() % 1;
};

Number.prototype.round = function () {
  return Math.round(this.valueOf());
};

Number.prototype.floor = function () {
  return Math.floor(this.valueOf());
};

Number.prototype.ceil = function () {
  return Math.ceil(this.valueOf());
};

Number.prototype.add = function (rhs: number) {
  return this.valueOf() + rhs;
};

Number.prototype.sub = function (rhs: number) {
  return this.valueOf() - rhs;
};

Number.prototype.mul = function (rhs: number) {
  return this.valueOf() * rhs;
};

Number.prototype.div = function (rhs: number) {
  return this.valueOf() / rhs;
};

Number.prototype.rem = function (rhs: number) {
  return this.valueOf() % rhs;
};

Number.prototype.abs = function () {
  return Math.abs(this.valueOf());
};

// Number.prototype.signum = function () {
//   return this.valueOf() >= 0 ? "+" : "-";
// };

// // Array

Array.prototype.min = function () {
  if (this.length == 0) {
    return undefined;
  }
  return this.reduce((a, b) => (a < b ? a : b), Number.POSITIVE_INFINITY);
};

Array.prototype.max = function () {
  if (this.length == 0) {
    return undefined;
  }
  return this.reduce((a, b) => (a > b ? a : b), Number.NEGATIVE_INFINITY);
};

Array.prototype.sum = function () {
  if (this.length == 0) {
    return undefined;
  }
  return this.reduce((a, b) => a + b, 0);
};

// Array.prototype.average = function () {
//   if (this.len == 0) {
//     return undefined;
//   }
//   return this.sum() / this.length;
// };

Array.prototype.first = function () {
  if (this.length == 0) {
    return undefined;
  }
  return this[0];
};

Array.prototype.last = function () {
  if (this.length == 0) {
    return undefined;
  }
  return this[this.length - 1];
};

Array.prototype.random = function () {
  return this[Math.random().mul(this.length).trunc()];
};

Array.prototype.take = function (n: number) {
  return this.slice(0, n);
};

Array.prototype.isEmpty = function () {
  return this.length == 0;
};

Array.prototype.without = function (other) {
  return this.filter((a) => !other.some((b) => a == b));
};

Array.prototype.inspect = function (fn) {
  return this.map((e) => {
    fn(e);
    return e;
  });
};

Array.prototype.unique = function () {
  return this.filter((elem, pos) => {
    return this.indexOf(elem) == pos;
  });
};

Array.prototype.await_map = async function <T, O>(
  fn: (x: T, i: number, self: Array<T>) => O,
): Promise<Array<O>> {
  const arr = await Promise.all(this);
  return arr.map(fn);
};

// Array.prototype.groupInto = function (group_size) {
//   return this.reduce(
//     (arr, obj) => {
//       if (arr.last().length < group_size) {
//         arr.last().push(obj);
//       } else {
//         arr.push([obj]);
//       }
//       return arr;
//     },
//     [[]]
//   );
// };

// Array.prototype.groupBy = function (fn) {
//   return this.reduce((map, obj) => {
//     let group_key = fn(obj);
//     if (!(group_key in map)) {
//       map[group_key] = [];
//     }
//     map[group_key].push(obj);
//     return map;
//   }, {});
// };

// Array.prototype.groupByKey = function (key) {
//   return this.reduce((map, obj) => {
//     let group_key = obj[key];
//     if (!(group_key in map)) {
//       map[group_key] = [];
//     }
//     map[group_key].push(obj);
//     return map;
//   }, {});
// };

// Array.prototype.groupByKey = function (key) {
//   return this.reduce((map, obj) => {
//     let group_key = obj[key];
//     if (!(group_key in map)) {
//       map[group_key] = [];
//     }
//     map[group_key].push(obj);
//     return map;
//   }, {});
// };

// // Map

// Map.prototype.map = function (key) {
//   return this.reduce((map, obj) => {
//     let group_key = obj[key];
//     if (!(group_key in map)) {
//       map[group_key] = [];
//     }
//     map[group_key].push(obj);
//     return map;
//   }, {});
// };

String.prototype.capitalize = function () {
  const head = this.slice(0, 1);
  const tail = this.slice(1);
  return head.toLocaleUpperCase() + tail;
};
