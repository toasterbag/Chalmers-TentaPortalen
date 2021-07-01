import { RequestError } from "./error";

export class Validator {
  protected val: any;
  protected prop: any;
  constructor(val: any, prop: any) {
    this.val = val;
    this.prop = prop;
  }

  get optional(): Validator | undefined {
    if (this.val == undefined) {
      return undefined;
    }
    return new Validator(this.val, this.prop);
  }

  default<T>(def: T): Validator | T {
    if (!this.val) {
      return def;
    }
    return new Validator(this.val, this.prop);
  }

  get string(): StringValidator {
    if (this.val) {
      return new StringValidator(this.val, this.prop);
    }
    throw new RequestError(
      400,
      `Invalid type for query parameter '${this.prop}', expected string.`,
    );
  }

  get number(): NumberValidator {
    const val = Number(this.val);
    if (isNaN(val)) {
      throw new RequestError(
        400,
        `Invalid type for query parameter '${this.prop}', expected number.`,
      );
    }
    return new NumberValidator(val, this.prop);
  }

  get boolean(): BooleanValidator {
    if (this.val == "true") {
      return new BooleanValidator(true, this.prop);
    } else if (this.val == "false") {
      return new BooleanValidator(false, this.prop);
    }
    throw new RequestError(
      400,
      `Invalid type for query parameter '${this.prop}', expected boolean.`,
    );
  }

  get_prop(prop: string): Validator {
    if (this.val === undefined) {
      throw new RequestError(400, `Missing query parameter '${prop}'.`);
    }

    const val = this.val[prop];
    return new Validator(val, prop);
  }

  get value(): any {
    return this.val;
  }
}

class StringValidator extends Validator {
  constructor(val: any, prop: any) {
    super(val, prop);
  }
}

class NumberValidator extends Validator {
  constructor(val: any, prop: any) {
    super(val, prop);
  }
}

class BooleanValidator extends Validator {
  constructor(val: any, prop: any) {
    super(val, prop);
  }
}

export function validate(query: any): Validator {
  return new Validator(query, undefined);
}
