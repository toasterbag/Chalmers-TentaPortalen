declare global {
  interface Set<T> {
    union(other: Set<T>): Set<T>;
    intersection(other: Set<T>): Set<T>;

    isSubSet(other: Set<T>): boolean;

    map<O>(fn: (val: T) => O): Set<O>;
    toArray(): Array<T>;
  }
}
export {};

Set.prototype.intersection = function intersection(other) {
  return Array.from(this)
    .filter((e) => other.has(e))
    .toSet();
};

Set.prototype.union = function union(other) {
  return Array.from(this).concat(Array.from(other)).toSet();
};

Set.prototype.isSubSet = function isSubSet<T>(other: Set<T>): boolean {
  return this.toArray().every((x) => other.has(x));
};

Set.prototype.map = function map(fn) {
  return this.toArray()
    .map((v) => fn(v))
    .toSet();
};

Set.prototype.toArray = function toArray() {
  return Array.from(this.values());
};
