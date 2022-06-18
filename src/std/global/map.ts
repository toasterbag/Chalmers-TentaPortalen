declare global {
  interface Map<K, V> {
    map<O>(fn: (key: K, val: V) => O): Map<K, O>;
    filter(fn: (key: K, val: V) => boolean): Map<K, V>;
    intersection<I>(other: Map<K, I>): Map<K, [V, I]>;

    pairs(): Array<[K, V]>;
    toArray(): Array<[K, V]>;
  }
}
export {};

Map.prototype.map = function map(fn) {
  return new Map(Array.from(this.entries()).map(([k, v]) => [k, fn(k, v)]));
};

Map.prototype.filter = function filter(fn) {
  return new Map(Array.from(this.entries()).filter(([k, v]) => fn(k, v)));
};

Map.prototype.pairs = function pairs() {
  return Array.from(this);
};

Map.prototype.toArray = function toArray() {
  return Array.from(this);
};

Map.prototype.intersection = function intersection(other) {
  const keys = Array.from(this.keys()).toSet();
  const keys2 = Array.from(other.keys()).toSet();
  return new Map(
    keys
      .intersection(keys2)
      .map((key) => [key, [this.get(key), other.get(key)]]),
  ) as any;
};
