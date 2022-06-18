import {
  z,
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  ZodType,
  ZodTypeAny,
} from "zod";
import { Response as ExpressResponse, RequestHandler } from "express";
import { Logger } from "src/log";
import { None, NoneType, Option, Some } from "@app/std/option";
import { Role } from "@app/prisma/clients/restricted";
import { UserProfile } from "@app/auth";
import { JsonArray, JsonObject } from "@app/utils/json";
import { toObject } from "@app/utils";
import { ErrorCode } from "./codes";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

// string is allowed so that we don't have to force parsing and restringifying when sending cache responses
type JsonResponse = JsonArray | JsonObject | string;
type ErrorResponse = Array<{
  code: string;
  message: string;
}>;
export class Response {
  private status: number;

  private body: JsonResponse | undefined;

  private constructor(status: number) {
    this.status = status;
  }

  withJson(obj: JsonResponse): this {
    this.body = obj;
    return this;
  }

  send(res: ExpressResponse): void {
    res.status(this.status);
    if (this.body !== undefined) res.json(this.body);
    else res.send();
  }

  static Ok<K extends string | number | symbol>(
    data: JsonResponse | Map<K, any>,
  ): Response {
    const res = new Response(200);
    if (data instanceof Map) {
      return res.withJson(toObject(data));
    }
    return res.withJson(data);
  }

  static Err(code: ErrorCode, data: ErrorResponse): Response {
    const res = new Response(code);
    if (data) {
      res.withJson(data);
    }
    return res;
  }
}

export const { Ok, Err } = Response;

// This is a lot of type programming, these are most likely not covering all cases
type ZodPrimitive = ZodString | ZodBoolean | ZodNumber | ZodDate | ZodEnum<any>;

type ZodTransforms<T extends ZodTypeAny> = ZodEffects<
  T | ZodOptionals<T>,
  z.infer<T> | undefined,
  z.infer<any> | undefined
>;

type ZodOptionals<T extends ZodPrimitive> = ZodDefault<T> | ZodOptional<T>;

export type QueryPrimitive = ZodString | ZodEnum<any>;

type QueryType =
  | QueryPrimitive
  | ZodTransforms<QueryPrimitive>
  | ZodOptionals<QueryPrimitive>;

type QuerySchema = ZodObject<{ [Key in string]: QueryType }>;

type BodyPrimitive = ZodString | ZodBoolean | ZodNumber;

type BodyType =
  | BodyPrimitive
  | ZodTransforms<BodyPrimitive>
  | ZodOptionals<BodyPrimitive>;

// There seems to be a bug which is disallowing recursive types for ZodObject.
// The current workaround is that we don't allow nested objects,
// this shouldn't a big issue
type BodySchema = ZodObject<any> | ZodArray<BodySchema | BodyType>;

type ParameterPrimitive = ZodString | ZodEnum<any>;
type ParameterSchema = ZodObject<{
  [Key in string]: ParameterPrimitive | ZodTransforms<ParameterPrimitive>;
}>;

// export type Upload = {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   destination: string;
//   filename: string;
//   path: string;
//   size: number;
// };

// export enum FileCount {
//   Single = "single",
//   Multi = "array",
// }

export type File = Express.Multer.File;

type FileValidator = (files: File) => Option<Response>;

export const RequireValidator = (file: File) => {
  if (!file)
    return Some(
      Err(ErrorCode.BadRequest, [
        { code: "Missing file", message: "No file uploaded" },
      ]),
    );
  return None;
};

type FilesSpec = {
  [key in string]: number;
};

export type EndpointSchema = {
  path: string;
  method: Method;
  params?: ParameterSchema;
  query?: QuerySchema;
  body?: BodySchema;
  middleware?: Array<RequestHandler>;
  files?: FilesSpec;
  auth: Option<Set<Role>>;
};

// export type Params<T> = T extends `${string}/:${infer U}/${infer R}`
//   ? { [P in U | keyof Params<`/${R}`>]: string }
//   : T extends `${string}/:${infer U}`
//   ? { [P in U]: string }
//   : never;

export type Params<T extends EndpointSchema> = T["params"] extends ZodType<any>
  ? z.infer<T["params"]>
  : undefined;

export type Query<T extends EndpointSchema> = T["query"] extends ZodType<any>
  ? z.infer<T["query"]>
  : undefined;

export type Body<T extends EndpointSchema> = T["body"] extends ZodType<any>
  ? z.infer<T["body"]>
  : undefined;

export type FilesKey = "files";
// export type Files<T extends EndpointSchema> = T[FilesKey] extends FilesSpec
//   ? FilesMap<T[FilesKey]>
//   : undefined;

// type FilesMap<T extends FilesSpec> = {
//   [Property in keyof T]: T[Property] extends FileCount.Single
//     ? Upload
//     : Array<Upload>;
// };

export type Files<T extends EndpointSchema> = T[FilesKey] extends FilesSpec
  ? FilesMap<T[FilesKey]>
  : undefined;

type FilesMap<T extends FilesSpec> = {
  [Property in keyof T]: File;
};

export type HasAuth<T extends EndpointSchema> = T["auth"] extends NoneType
  ? undefined
  : UserProfile;

export type Request<S extends EndpointSchema> = {
  log: Logger;
  params: Params<S>;
  query: Query<S>;
  body: Body<S>;
  files: Files<S>;
  profile: UserProfile | undefined;
};

export type EndpointHandler<S extends EndpointSchema, C> = (
  req: Request<S>,
  context: C,
) => Promise<Response>;

export type GenericEndpointHandler<C> = EndpointHandler<any, C>;

export class Endpoint<Schema extends EndpointSchema, C> {
  schema: Schema;

  handler: EndpointHandler<Schema, C>;

  constructor(schema: Schema, handler: EndpointHandler<Schema, C>) {
    this.schema = schema;
    this.handler = handler;
  }
}

// export type EndpointTree<Context> = {
//   [key in string]: Endpoint<any, Context> | EndpointTree<Context>;
// };
