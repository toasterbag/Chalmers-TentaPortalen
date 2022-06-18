type SortType = number | boolean;

declare global {
  interface Array<T> {
    take(n: number): Array<T>;
    skip(n: number): Array<T>;
    sum(): number;
    average(): number;
    min(): number;
    max(): number;
    first(): T;
    last(): T;
    random(): T;
    isEmpty(): boolean;
    inspect(fn: (x: T) => void): Array<T>;
    // zip<X>(other: Array<X>): Array<[T, X]>;

    unique(): Array<T>;
    toSet(): Set<T>;
    without(filter: Array<T>): Array<T>;

    sortBy(fn: (left: T, right: T) => SortType): Array<T>;
    sortAscending(fn: (val: T) => number): Array<T>;
    sortDescending(fn: (val: T) => number): Array<T>;
    groupInto(n: number): Array<Array<T>>;
    groupBy<K>(fn: (e: T) => K): Map<string, Array<T>>;
  }
}
export {};

Array.prototype.min = function min() {
  return this.reduce((a, b) => (a < b ? a : b), Number.POSITIVE_INFINITY);
};

Array.prototype.max = function max() {
  return this.reduce((a, b) => (a > b ? a : b), Number.NEGATIVE_INFINITY);
};

Array.prototype.sum = function sum() {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.average = function average() {
  return this.sum() / this.length;
};

Array.prototype.first = function first() {
  return this[0];
};

Array.prototype.last = function last() {
  return this[this.length - 1];
};

Array.prototype.random = function random() {
  return this[Math.random().mul(this.length).trunc()];
};

Array.prototype.take = function take(n: number) {
  return this.slice(0, n);
};

Array.prototype.skip = function skip(n: number) {
  return this.slice(n);
};

Array.prototype.isEmpty = function isEmpty() {
  return this.length === 0;
};

Array.prototype.without = function without(other) {
  return this.filter((a) => !other.some((b) => a === b));
};

Array.prototype.inspect = function inspect(fn) {
  return this.map((e) => {
    fn(e);
    return e;
  });
};

Array.prototype.unique = function unique() {
  return this.filter((elem, pos) => {
    return this.indexOf(elem) === pos;
  });
};

Array.prototype.sortBy = function sortBy(comparator) {
  return this.map((e) => e).sort((a, b) => {
    const res = comparator(a, b);
    if (res === true) return 1;
    if (res === false) return -1;
    return res;
  });
};

Array.prototype.sortAscending = function sortAscending(extractor) {
  return this.sortBy((a, b) => extractor(a) > extractor(b));
};

Array.prototype.sortDescending = function sortDescending(extractor) {
  return this.sortBy((a, b) => extractor(a) < extractor(b));
};

Array.prototype.groupInto = function groupInto(groupSize) {
  return this.reduce(
    (arr, obj) => {
      if (arr.last().length < groupSize) {
        arr.last().push(obj);
      } else {
        arr.push([obj]);
      }
      return arr;
    },
    [[]],
  );
};

Array.prototype.groupBy = function groupBy(fn) {
  const dict = this.reduce((map, obj) => {
    const groupKey = fn(obj);
    if (!map.has(groupKey)) {
      map.set(groupKey, []);
    }
    const values = map.get(groupKey);
    values?.push(obj);
    return map;
  }, new Map());
  return dict;
};

Array.prototype.toSet = function toSet() {
  return new Set(this);
};
