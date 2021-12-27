export class AppError<
  Kind extends string,
  Data extends
    | { [key: string]: string | number | boolean | Date }
    | undefined = undefined,
> extends Error {
  public readonly kind: Kind;

  public readonly data?: Data;

  constructor(kind: Kind, data?: Data) {
    super();
    this.kind = kind;
    this.data = data;
  }

  toString() {
    return `Error: ${this.kind} ${this.data ?? ""}`;
  }
}
