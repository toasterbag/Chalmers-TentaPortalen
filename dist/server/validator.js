"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.Validator = void 0;
const error_1 = require("./error");
class Validator {
    constructor(val, prop) {
        this.val = val;
        this.prop = prop;
    }
    get optional() {
        if (this.val == undefined) {
            return undefined;
        }
        return new Validator(this.val, this.prop);
    }
    default(def) {
        if (!this.val) {
            return def;
        }
        return new Validator(this.val, this.prop);
    }
    get string() {
        if (this.val) {
            return new StringValidator(this.val, this.prop);
        }
        throw new error_1.RequestError(400, `Invalid type for query parameter '${this.prop}', expected string.`);
    }
    get number() {
        const val = Number(this.val);
        if (isNaN(val)) {
            throw new error_1.RequestError(400, `Invalid type for query parameter '${this.prop}', expected number.`);
        }
        return new NumberValidator(val, this.prop);
    }
    get boolean() {
        if (this.val == "true") {
            return new BooleanValidator(true, this.prop);
        }
        else if (this.val == "false") {
            return new BooleanValidator(false, this.prop);
        }
        throw new error_1.RequestError(400, `Invalid type for query parameter '${this.prop}', expected boolean.`);
    }
    get_prop(prop) {
        if (this.val === undefined) {
            throw new error_1.RequestError(400, `Missing query parameter '${prop}'.`);
        }
        const val = this.val[prop];
        return new Validator(val, prop);
    }
    get value() {
        return this.val;
    }
}
exports.Validator = Validator;
class StringValidator extends Validator {
    constructor(val, prop) {
        super(val, prop);
    }
}
class NumberValidator extends Validator {
    constructor(val, prop) {
        super(val, prop);
    }
}
class BooleanValidator extends Validator {
    constructor(val, prop) {
        super(val, prop);
    }
}
function validate(query) {
    return new Validator(query, undefined);
}
exports.validate = validate;
//# sourceMappingURL=validator.js.map