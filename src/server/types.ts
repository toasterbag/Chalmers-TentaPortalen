import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler,
} from "express";
import { Context } from "@app/context";
import { Role } from "@prisma/client";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

// type Query = Record<string, string | number | undefined | boolean>;

export type JsonPrimitive = string | number | boolean;

export type JsonObject = { [Key in string]?: JsonValue };

export type JsonArray = Array<JsonValue>;

export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

export type JsonResponse = JsonArray | JsonObject;

class Response {
  private status: number;

  private body: unknown;

  private headers: { [key: string]: string };

  constructor(status: number, body: JsonResponse = {}) {
    this.status = status;
    this.body = body;
    this.headers = {};
  }

  set_status(status: number): this {
    this.status = status;
    return this;
  }

  set_content_type(val: string): this {
    this.headers["Content-Type"] = val;
    return this;
  }

  set_body(obj: unknown): this {
    this.body = obj;
    return this;
  }

  send(res: ExpressResponse): void {
    for (const [key, val] of Object.entries(this.headers)) {
      res.set(key, val);
    }
    res.status(this.status);
    if (this.body instanceof Map)
      this.body = Array.from(this.body.entries()).reduce(
        (obj, [key, val]) => Object.assign(obj, { [key]: val }),
        {},
      );
    res.send(this.body);
  }
}

function Ok(body: unknown = {}): Response {
  return new Response(200).set_body(body);
}

type ParseRouteParameters<T> = T extends `${string}/:${infer U}/${infer R}`
  ? { [P in U | keyof ParseRouteParameters<`/${R}`>]: string }
  : T extends `${string}/:${infer U}`
  ? { [P in U]: string }
  : unknown;

type EndpointHandler = (req: ExpressRequest, ctx: Context) => Promise<Response>;

type RequiredEndpointProps = {
  method: Method;
  path: string;
  handler: EndpointHandler;
};

type OptionalEndpointProps = Partial<{
  middleware: Array<RequestHandler>;
  uploads: { [key: string]: "single" | "array" };
  auth: Set<Role>;
}>;

// type Endpoint = RequiredEndpointProps & Required<OptionalEndpointProps>;
type Endpoint = RequiredEndpointProps & OptionalEndpointProps;

// export const defineEndpoint = ({
//   method,
//   path,
//   handler,
//   middleware,
//   uploads,
//   auth,
// }: RequiredEndpointProps & OptionalEndpointProps): Endpoint => ({
//   method,
//   path,
//   handler,
//   middleware: middleware ?? [],
//   uploads: uploads ?? {},
//   auth: auth ?? new Set(),
// });

export {
  Ok,
  Response,
  Method,
  Endpoint,
  EndpointHandler,
  ParseRouteParameters,
};
