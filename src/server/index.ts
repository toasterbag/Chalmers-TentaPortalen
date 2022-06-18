import express, {
  Application,
  RequestHandler,
  Request,
  NextFunction,
  Response as ExpressResponse,
} from "express";
import chalk from "chalk";
import cors from "cors";
import { Logger } from "src/log";
import http from "node:http";
import { Context } from "@app/context";
import { randomUUID } from "node:crypto";

import { readdir, stat } from "fs-extra";
import { join, resolve } from "node:path";
import { Role } from "@app/prisma/clients/restricted";
import { isSome } from "@app/std/option";
import { Ok, Result, Err, isOk } from "@app/std/result";
import { UserProfile } from "@app/auth";
import { performance } from "perf_hooks";
import { ZodError } from "zod";
import multer from "multer";
import {
  Method,
  GenericEndpointHandler,
  EndpointSchema,
  Endpoint,
  Err as ErrorResponse,
  Response,
} from "./types";
import { ErrorCode } from "./codes";

const colorMethod = (method: string) => {
  switch (method) {
    case "GET":
      return chalk.green;
    case "POST":
      return chalk.blue;
    case "DELETE":
      return chalk.red;
    case "PUT":
      return chalk.cyan;
    case "PATCH":
      return chalk.yellow;
    default:
      return chalk.white;
  }
};

// const colorStatus = (method: any) => {
//   switch ((method / 100).floor()) {
//     case 2:
//       return chalk.green;
//     case 3:
//       return chalk.blue;
//     case 4:
//       return chalk.yellow;
//     case 5:
//       return chalk.red;
//     default:
//       return chalk.white;
//   }
// };

const find = async (path: string, ext?: string): Promise<Array<string>> => {
  const items = await readdir(path);
  const pendingStats = items
    .map((p) => resolve(path, p))
    .map(async (p) => ((await stat(p)).isDirectory() ? find(p) : [p]));
  const stats = await Promise.all(pendingStats);

  const res = stats.reduce((a, f) => [...a, ...f], []);
  if (ext) {
    return res.filter((s) => s.endsWith(ext));
  }
  return res;
};

const loadEndpoints = async (): Promise<
  Array<{
    handler: any;
    schema: EndpointSchema;
  }>
> => {
  const modulePath = join(__dirname, "..", "routes2");
  const routes = await find(modulePath, ".js");
  const modules = await Promise.all(
    routes.map(async (path) => [path, await import(path)]),
  );
  const endpoints: Array<[string, Endpoint<any, Context>]> = modules
    .filter(([, m]) => "default" in m)
    .map(([p, m]) => [p, m.default])
    .filter(([, e]) => e instanceof Endpoint) as any;

  // Please don't hate me for this
  for (const [path1, endpoint1] of endpoints) {
    for (const [path2, endpoint2] of endpoints) {
      if (endpoint1 !== endpoint2) {
        if (endpoint1.schema.method === endpoint2.schema.method) {
          if (endpoint1.schema.path === endpoint2.schema.path) {
            throw new Error(`Conflicting endpoints: '${path1}' and '${path2}`);
          }
        }
      }
    }
  }
  return endpoints.map(([, e]) => e);
};

const parseUploads = (schema: EndpointSchema, req: Request): Response | any => {
  if (schema.files === undefined) return undefined;
  console.log(req.files);
  // We cast req.files to any as our middleware assures us that it is created using multer.fields
  const uploads = req.files as any;
  for (const [key] of Object.entries(schema.files)) {
    if (!(key in (uploads ?? {})))
      return ErrorResponse(ErrorCode.NotFound, [
        {
          code: "missing form field",
          message: `missing form field: '${key}' `,
        },
      ]);
    const file = uploads[key][0];
    uploads[key] = file;
  }
  return uploads;
};

type ServerArgs<Context> = {
  ctx: Context;
  logger: Logger;
  root: string;
};

// type ExtendedRequest = Request & { log: Logger };

// const validateSchema = (schema: EndpointSchema) => {
// const pathParams = schema.path.match(/:([a-zA-Z]*)/);
// if(pathParams !== null) {
//   for(const p of Array.from(pathParams)) {
//     if(!(p in schema.params)) {
//       throw new Error(`Endpoint '${schema.path}' does not use parameter ${p.}`)
//     }
//   }
// }
// };
export class Server {
  private app: Application;

  private ctx: Context;

  private logger: Logger;

  private root: string;

  constructor({ ctx, logger, root }: ServerArgs<Context>) {
    this.ctx = ctx;
    this.logger = logger;
    this.root = root;
    this.app = express();
    this.app.set("trust proxy", true);

    // this.app.use((req: Request, res: ExpressResponse, next: NextFunction) => {

    //   next();
    // });

    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(cors());
  }

  async authenticate(
    req: Request,
    auth: Set<Role>,
  ): Promise<Result<UserProfile, Response>> {
    if (req.headers.authorization) {
      const roles = auth;
      const token = req.headers.authorization.replace("Token: ", "");
      const user = await this.ctx.auth.authUserWithToken(token);
      if (isSome(user)) {
        if (roles.isSubSet(user.val.roles.toSet())) {
          return new Ok(user.val);
        }
        return new Err(
          ErrorResponse(ErrorCode.Forbidden, [
            {
              code: "Forbidden",
              message: "You do not have permission to access this endpoint",
            },
          ]),
        );
      }
    }
    return new Err(
      ErrorResponse(ErrorCode.Unauthorized, [
        { code: "Unauthorized", message: "Invalid token" },
      ]),
    );
  }

  buildRouteHandler(
    schema: EndpointSchema,
    handler: GenericEndpointHandler<Context>,
  ): any {
    return async (req: Request, res: ExpressResponse): Promise<void> => {
      const timestamp = performance.now();
      const log = this.logger.extend({
        connectionId: randomUUID(),
        method: req.method,
        path: req.path,
        hostname: req.hostname,
        ip: req.ip,
      });
      log.info("Incoming request");
      try {
        let profile: UserProfile | undefined;
        if (isSome(schema.auth)) {
          const result = await this.authenticate(req, schema.auth.val);
          if (isOk(result)) {
            profile = result.val;
          } else {
            result.val.send(res);
            log.warn("Invalid uploads", {
              status: res.statusCode,
              duration: performance.now() - timestamp,
            });
            return;
          }
        }
        const query = schema.query ? schema.query.parse(req.query) : undefined;
        const body = schema.body ? schema.body.parse(req.body) : undefined;
        const params = schema.params
          ? schema.params.parse(req.params)
          : undefined;
        const files = parseUploads(schema, req);
        if (files instanceof Response) {
          res.status(400).json(files);
          log.error("", {
            status: res.statusCode,
            duration: performance.now() - timestamp,
          });
          return;
        }
        log.info("Request data", { query, body, params });
        const response = await handler(
          { log, query, body, params, files, profile },
          this.ctx,
        );
        response.send(res);
        log.info("Response sent", {
          status: res.statusCode,
          duration: performance.now() - timestamp,
        });
      } catch (e: unknown) {
        if (e instanceof ZodError) {
          res.status(400).json(e.issues);
          log.error("Bad response", {
            status: res.statusCode,
            error: JSON.parse(e as any),
            duration: performance.now() - timestamp,
          });
        } else {
          res.status(500).json({});
          log.error("Internal server error", {
            status: res.statusCode,
            error: JSON.parse(e as any),
            duration: performance.now() - timestamp,
          });
        }

        console.error(e);
      }
    };
  }

  async listen(host: string, port: number): Promise<void> {
    const uploads = multer({ dest: this.ctx.config.paths.uploads });

    for (const { handler, schema } of await loadEndpoints()) {
      // validateSchema(schema);
      const { method } = schema;
      const path = join(this.root, schema.path);
      const expressHandler = this.buildRouteHandler(schema, handler);
      const callbacks: Array<RequestHandler> = schema.middleware ?? [];

      // Add file upload middleware
      if (schema.files) {
        callbacks.push(
          uploads.fields(
            Object.entries(schema.files).map(([name]) => ({
              name,
              maxCount: 1,
            })),
          ),
        );
      }

      callbacks.push(expressHandler);

      switch (method) {
        case Method.GET:
          this.app.get(path, ...callbacks);
          break;
        case Method.POST:
          this.app.post(path, ...callbacks);
          break;
        case Method.DELETE:
          this.app.delete(path, ...callbacks);
          break;
        case Method.PUT:
          this.app.put(path, ...callbacks);
          break;
        case Method.PATCH:
          this.app.patch(path, ...callbacks);
          break;
      }

      const coloredPath = path
        .replace(/:([a-zA-Z]*)/g, (e: string) => `:${chalk.yellow(e.slice(1))}`)
        .replace(this.root, chalk.gray(this.root));
      const coloredMethod = `${colorMethod(method)(method.padEnd(7))}`;
      // routes.push({ method: coloredMethod, path: coloredPath });
      console.log(`${coloredMethod.padEnd(8)}${coloredPath}`);
    }

    const server = http.createServer(this.app);

    server.listen({ host, port }, () => {
      this.logger.info("Server started", {
        host,
        port,
      });
    });
  }
}

export default Server;
