import { Server as HttpServer } from "http";
import express, {
  Application,
  RequestHandler,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { join } from "path";
import multer from "multer";
import chalk from "chalk";
import cors from "cors";

import { Context } from "@app/context";
import { find, isDefined } from "@app/utils/index";
import { unlink } from "fs-extra";
import { UserProfile } from "@app/auth";
import { isNone, isSome, None, Option } from "@app/std/option";

import { print_table } from "./table";
import { Method, Response, Endpoint, EndpointHandler, Ok } from "./types";

const color_method = (method: any) => {
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

// const color_status = (method: any) => {
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

type ServerArgs = {
  ctx: Context;
  mount_path?: string;
};

class Server {
  private app: Application;

  private ctx: Context;

  private mount_path: string;

  private endpoints: Array<Endpoint> = [];

  constructor({ ctx, mount_path = "/" }: ServerArgs) {
    this.ctx = ctx;
    this.mount_path = mount_path;
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/public", express.static(this.ctx.config.paths.data));
  }

  async getUserProfile(req: ExpressRequest): Promise<Option<UserProfile>> {
    if (req.headers.authorization?.startsWith("Token: ")) {
      return this.ctx.auth.authUserWithToken(
        req.headers.authorization.replace("Token: ", ""),
      );
    }
    return None;
  }

  wrap_endpoint(endpoint: Endpoint) {
    return async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
      const log = this.ctx.log.extend({
        method: req.method,
        path: req.path,
        hostname: req.hostname,
        ip: req.ip,
      });
      log.info("Incoming request");

      const profile = await this.getUserProfile(req);

      // If endpoint has role restriction
      if (endpoint.auth && endpoint.auth.size > 0) {
        if (
          (isSome(profile) &&
            profile.val.roles.toSet().isSubSet(endpoint.auth)) ||
          isNone(profile)
        ) {
          res.status(401).send();
          log.error("Invalid authentication", { status: 401 });
          return;
        }
      }

      try {
        const response = await endpoint.handler(req, this.ctx);
        response.send(res);
        log.info("Response sent", { status: res.statusCode });
      } catch (e: any) {
        if (e.http_code) {
          console.error(e);
          res.status(e.http_code).send(e.description);
          log.error(e.description, { status: res.statusCode });
        } else {
          res.status(500);
          log.error("Internal server error", { status: res.statusCode });
        }
      }

      if (req.file) {
        await unlink(req.file.path).catch(() => {});
      }

      if (req.files) {
        for (const files of Object.values(req.files)) {
          for (const file of files) {
            await unlink(file.path).catch(() => {});
          }
        }
      }
    };
  }

  private register_route(endpoint: Endpoint): void {
    this.endpoints.push({
      ...endpoint,
      auth: endpoint.auth ? endpoint.auth : new Set(),
    });
  }

  async import_routes(): Promise<void> {
    const routes = (await find(join(__dirname, "../routes"), ".js")).map(
      (f) => import(f),
    );
    const modules: Array<any> = (await Promise.all(routes))
      .flatMap((m: any) => Object.values(m))
      .filter((route: any) => route.method && route.path && route.handler);
    modules
      .filter((e) => !e.path.includes(":"))
      .sort((a: any, b: any) => {
        return a.path.localeCompare(b.path) || a.method.localeCompare(b.method);
      })
      .forEach((r) => this.register_route(r));

    modules
      .filter((e) => e.path.includes(":"))
      .sort((a: any, b: any) => {
        return a.path.localeCompare(b.path) || a.method.localeCompare(b.method);
      })
      .forEach((r) => this.register_route(r));
  }

  mount(http_server: HttpServer): void {
    const uploads = multer({ dest: this.ctx.config.paths.uploads });

    const routes = Object.values(this.endpoints).map((endpoint) => {
      const { method } = endpoint;
      const path = join(this.mount_path, endpoint.path);
      const handler = this.wrap_endpoint(endpoint);
      let callbacks: Array<RequestHandler> = endpoint.middleware ?? [];

      // Add file upload middleware
      if (endpoint.uploads) {
        const file_callbacks = Object.entries(endpoint.uploads)
          .map(([key, val]) => {
            if (val === "single") {
              return uploads.single(key);
            }

            return uploads.array(key);
          })
          .filter(isDefined);
        callbacks = callbacks.concat(file_callbacks);
      }

      callbacks.push(handler);

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

      const colored_path = path.replace(
        /:([a-zA-Z]*)/g,
        (e) => `:${chalk.yellow(e.slice(1))}`,
      );
      const colored_method = `${color_method(method)(method.padEnd(7))}`;
      return { method: colored_method, path: colored_path };
    });

    print_table("Registered endpoints", ["method", "path"], routes);
    http_server.addListener("request", this.app);
  }
}

export default Server;
export { Method, Ok, Response, Endpoint, EndpointHandler };
