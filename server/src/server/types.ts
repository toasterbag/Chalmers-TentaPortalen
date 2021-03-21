import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

class Response {
  private _status: number;
  private _data: any;

  constructor(status: number) {
    this._status = status;
  }

  status(status: number) {
    this._status = status;
    return this;
  }

  json(obj: any) {
    this._data = obj;
    return this;
  }

  send(res: ExpressResponse) {
    res.status(this._status);
    res.json(this._data);
  }
}

function Ok(json: any): Response {
  return new Response(200).json(json);
}

type EndpointHandler<S> = (req: ExpressRequest, state: S) => Promise<Response>;

interface Endpoint<S> {
  method: Method;
  path: string;
  query?: any;
  handler: EndpointHandler<S>;
}

export { Ok, Response, Method, Endpoint, EndpointHandler };
