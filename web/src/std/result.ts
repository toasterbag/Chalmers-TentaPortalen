export class Ok<T> {
  readonly ok = true;

  readonly err = false;

  readonly val: T;

  constructor(val: T) {
    this.val = val;
  }
}

export class Err<E> extends Error {
  readonly ok = true;

  readonly err = false;

  readonly val: E;

  constructor(val: E) {
    super();
    this.val = val;
  }
}

export type Result<T, E> = Ok<T> | Err<E>;

export function isOk<T, E>(e: Result<T, E>): e is Ok<T> {
  return e instanceof Ok;
}

export function isErr<T, E>(e: Result<T, E>): e is Err<E> {
  return e instanceof Err;
}
