import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler,
} from "express";
import { Context } from "@app/context";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

class Response {
  private _status: number;
  private body: any;

  constructor(status: number, body: any = {}) {
    this._status = status;
    this.body = body;
  }

  status(status: number): this {
    this._status = status;
    return this;
  }

  json(obj: any): this {
    this.body = obj;
    return this;
  }

  send(res: ExpressResponse): void {
    res.status(this._status);
    res.json(this.body);
  }
}

function Ok(json: any = {}): Response {
  return new Response(200).json(json);
}

type ParseRouteParameters<T> = T extends `${string}/:${infer U}/${infer R}`
  ? { [P in U | keyof ParseRouteParameters<`/${R}`>]: string }
  : T extends `${string}/:${infer U}`
  ? { [P in U]: string }
  : unknown;

type EndpointHandler = (req: ExpressRequest, ctx: Context) => Promise<Response>;

interface Endpoint {
  method: Method;
  path: string;
  query?: any;
  middleware?: Array<RequestHandler>;
  uploads?: { [key: string]: "single" | "array" };
  auth?: Array<string>;
  handler: EndpointHandler;
}

export {
  Ok,
  Response,
  Method,
  Endpoint,
  EndpointHandler,
  ParseRouteParameters,
};
