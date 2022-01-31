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

Number.prototype.frac = function () {
  return this.valueOf() % 1;
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
  if (this.length == 0) {
    return true;
  }
  return false;
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

Array.prototype.groupInto = function (group_size) {
  return this.reduce(
    (arr, obj) => {
      if (arr.last().length < group_size) {
        arr.last().push(obj);
      } else {
        arr.push([obj]);
      }
      return arr;
    },
    [[]]
  );
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


Array.prototype.sortBy = function (compare_fn) {
  return this.map((e) => e).sort((a, b) => {
    return compare_fn(a, b)
  });
};

Array.prototype.sortByKey = function (extractKey) {
  return this.map((e) => e).sort((a, b) => {
    const a_key = extractKey(a);
    const b_key = extractKey(b);
    if (a_key instanceof String && b_key instanceof String) {
      return a_key.localeCompare(b_key);
    }
    return a_key - b_key;
  });
};

Array.prototype.order = function (asc = true) {
  return asc ? this : this.map((e) => e).reverse();
};

Array.prototype.toSet = function() {
  return new Set(this)
}

Set.prototype.toArray = function() {
  return Array.from(this.values())
}

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
  var err = target - numbers.map((x) => x.floor()).sum();
  return numbers
    .map((e, i) => [e, i])
    .sort(([a], [b]) => a.frac() > b.frac())
    .map(([x, _i], i) => [
      x == 0 ? err++ && 0 : x.floor() + (err > i ? 1 : 0),
      _i,
    ])
    .sort(([, a], [, b]) => a > b)
    .map(([x]) => x);
};

global.CSS = {
  getVar(v) {
    return window
      .getComputedStyle(document.querySelector("[theme]"))
      .getPropertyValue(`--${v}`);
  },
};
