global.wait = (t) => new Promise((resolve) => setTimeout(resolve, t));

// Number

Number.prototype.roundTo = function (decimalPlaces) {
  return Number(
    Math.round(this.valueOf() + "e" + decimalPlaces) + "e-" + decimalPlaces
  );
};

Number.prototype.trunc = function () {
  return Math.trunc(this.valueOf());
};

Number.prototype.round = function () {
  return Math.round(this.valueOf());
};

Number.prototype.add = function (other) {
  return this.valueOf() + other;
};

Number.prototype.sub = function (other) {
  return this.valueOf() - other;
};

Number.prototype.mul = function (other) {
  return this.valueOf() * other;
};

Number.prototype.div = function (other) {
  return this.valueOf() / other;
};

Number.prototype.signum = function () {
  return this.valueOf() >= 0 ? "+" : "-";
};

// Array

Array.prototype.min = function () {
  if (this.len == 0) {
    return undefined;
  }
  return this.reduce((a, b) => (a < b ? a : b), Number.POSITIVE_INFINITY);
};

Array.prototype.max = function () {
  if (this.len == 0) {
    return undefined;
  }
  return this.reduce((a, b) => (a > b ? a : b), 0);
};

Array.prototype.sum = function () {
  if (this.len == 0) {
    return undefined;
  }
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.average = function () {
  if (this.len == 0) {
    return undefined;
  }
  return this.sum() / this.length;
};

Array.prototype.first = function () {
  if (this.len == 0) {
    return undefined;
  }
  return this[0];
};

Array.prototype.last = function () {
  if (this.len == 0) {
    return undefined;
  }
  return this[this.length - 1];
};

Array.prototype.take = function (n) {
  return this.slice(0, n);
};

Array.prototype.isEmpty = function () {
  if (this.len == 0) {
    return true;
  }
  return false;
};

Array.prototype.group_by = function (key) {
  return this.reduce((map, obj) => {
    let group_key = obj[key];
    if (!map.has(group_key)) {
      map.set(group_key, []);
    }
    map.get(group_key).push(obj);
    return map;
  }, new Map());
};

// Map

Map.prototype.map = function (fn) {
  let new_map = new Map();
  this.forEach((value, key) => {
    new_map.set(key, fn(value));
  });
  return new_map;
};
