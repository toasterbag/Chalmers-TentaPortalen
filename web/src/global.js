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

Number.prototype.floor = function () {
  return Math.floor(this.valueOf());
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

Array.prototype.inspect = function (fn) {
  return this.map(e => {
    fn(e)
    return e;
  });
};

Array.prototype.groupBy = function (fn) {
  return this.reduce((map, obj) => {
    let group_key = fn(obj);
    if (!(group_key in map)) {
      map[group_key] = [];
    }
    map[group_key].push(obj);
    return map;
  }, {});
};

Array.prototype.groupByKey = function (key) {
  return this.reduce((map, obj) => {
    let group_key = obj[key];
    if (!(group_key in map)) {
      map[group_key] = [];
    }
    map[group_key].push(obj);
    return map;
  }, {});
};

Array.prototype.groupByKey = function (key) {
  return this.reduce((map, obj) => {
    let group_key = obj[key];
    if (!(group_key in map)) {
      map[group_key] = [];
    }
    map[group_key].push(obj);
    return map;
  }, {});
};

// Map

Map.prototype.map = function (key) {
  return this.reduce((map, obj) => {
    let group_key = obj[key];
    if (!(group_key in map)) {
      map[group_key] = [];
    }
    map[group_key].push(obj);
    return map;
  }, {});
};

// Math

Math.roundToTarget = function (numbers, target) {
  var err = target - numbers.reduce((acc, x) => acc + x.floor(), 0);
  return numbers
    .sort((a, b) => a.sub(a.floor()) > b.round(b.floor()))
    .map((x, i) => x.floor() + ((err > i) ? 1 : 0));
}
