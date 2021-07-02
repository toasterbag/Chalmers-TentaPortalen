import { Server as HttpServer } from "http";
import express, { NextFunction } from "express";
import { Application, RequestHandler } from "express";
import { join } from "path";
import multer from "multer";
import chalk from "chalk";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import cors from "cors";

import { Method, Response, Endpoint, EndpointHandler, Ok } from "./types";
import { Context } from "@app/context";
import { Logger } from "@app/logger";
import { print_table } from "./table";
import { find } from "@app/utils";
import { Body } from "node-fetch";
const Log = new Logger({ label: "API" });

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

const color_status = (method: any) => {
  switch ((method / 100).floor()) {
    case 2:
      return chalk.green;
    case 3:
      return chalk.blue;
    case 4:
      return chalk.yellow;
    case 5:
      return chalk.red;
    default:
      return chalk.white;
  }
};

const logger_middleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) => {
  const method = `${color_method(req.method)(req.method.padEnd(5))}`;
  Log.info(`${method} <-  ${req.path}`);

  res.on("finish", function () {
    const status = color_status(res.statusCode)(res.statusCode);
    Log.info(`${method} ${status} ${req.path}`);
  });
  next();
};

type ServerArgs = {
  state: Context;
  mount_path?: string;
};
class Server {
  private app: Application;
  private state: Context;
  private mount_path: string;
  private endpoints: Array<Endpoint> = [];

  constructor({ state, mount_path = "/" }: ServerArgs) {
    this.state = state;
    this.mount_path = mount_path;
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(logger_middleware);
  }

  wrap_endpoint(endpoint: Endpoint) {
    return async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
      if (endpoint.auth?.includes("admin")) {
        if (
          req.headers.authorization != this.state.config.admin_password &&
          req.body.password != this.state.config.admin_password
        ) {
          res.status(401).send();
          return;
        }
      }

      try {
        const response = await endpoint.handler(req, this.state);
        response.send(res);
      } catch (e) {
        if (e.http_code) {
          console.error(e);
          res.status(e.http_code).send(e.description);
        } else {
          console.error(e);
          res.status(500).send(e);
        }
      }
    };
  }

  private register_route(endpoint: Endpoint): void {
    this.endpoints.push(endpoint);
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
    const uploads = multer({ dest: this.state.config.paths.uploads });

    const routes = [];
    for (const endpoint of this.endpoints) {
      const method = endpoint.method;
      const path = join(this.mount_path, endpoint.path);
      const handler = this.wrap_endpoint(endpoint);
      const callbacks: Array<RequestHandler> = endpoint.middleware ?? [];

      // Add file upload middleware
      if (endpoint.uploads) {
        for (const [key, val] of Object.entries(endpoint.uploads)) {
          switch (val) {
            case "single":
              callbacks.push(uploads.single(key));
              break;
            case "array":
              callbacks.push(uploads.array(key));
              break;
          }
        }
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
        (e) => ":" + chalk.yellow(e.slice(1)),
      );
      const colored_method = `${color_method(method)(method.padEnd(7))}`;
      routes.push({ method: colored_method, path: colored_path });
    }

    print_table("Registered endpoints", ["method", "path"], routes);
    http_server.addListener("request", this.app);
  }
}

export default Server;
export { Method, Ok, Response, Endpoint, EndpointHandler };
