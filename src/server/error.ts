class RequestError extends Error {
  http_code: number;

  description: string;

  constructor(code: number, description: string) {
    super();
    this.http_code = code;
    this.description = description;
  }
}

export { RequestError };
