interface BaseOption {
  isSome(): boolean;
  isNone(): boolean;
}

export class SomeType<T> implements BaseOption {
  public readonly val: T;

  constructor(val: T) {
    this.val = val;
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }
}

export class NoneType implements BaseOption {
  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }
}

export const Some = <T>(t: T) => new SomeType(t);
export const None = new NoneType();

export type Option<T> = SomeType<T> | typeof None;

export function isSome<T>(e: Option<T>): e is SomeType<T> {
  return e.isSome();
}

export function isNone<T>(e: Option<T>): e is typeof None {
  return e.isNone();
}
