import http from "http";
import express from "express";
import { Application, RequestHandler } from "express";

import chalk from "chalk";
import { Method, Response, Endpoint, EndpointHandler, Ok } from "./types";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { RequestError } from "./error";
import cors from "cors";

import { makeLogger } from "@app/logger";
const Log = makeLogger({ label: "Server" });

const method_colors = {
  GET: chalk.green,
  POST: chalk.blue,
  DELETE: chalk.red,
  PUT: chalk.cyan,
  PATCH: chalk.yellow,
};

class Server<S> {
  app: Application;
  state: S;
  endpoints: Array<Endpoint<S>> = [];

  constructor(state: S) {
    this.state = state;
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  wrap_endpoint(endpoint: Endpoint<S>) {
    return async (req: ExpressRequest, res: ExpressResponse) => {
      Log.info(`Http request: ${req.path}`);

      try {
        let response = await endpoint.handler(req, this.state);
        response.send(res);
      } catch (e) {
        if (e.http_code) {
          res.status(e.http_code).send(e.description);
        } else {
          res.status(500).send(e);
        }
      }
    };
  }

  route(endpoint: Endpoint<S>) {
    this.endpoints.push(endpoint);
  }

  serve(port: Number) {
    Log.info(chalk.yellow(`Registering endpoints`));
    for (let endpoint of this.endpoints) {
      const method = endpoint.method;
      const path = endpoint.path;
      const handler = this.wrap_endpoint(endpoint);
      const callbacks: Array<RequestHandler> = endpoint.middleware ?? [];
      callbacks.push(handler);

      switch (method) {
        case Method.GET:
          this.app.get(path, ...callbacks);
        case Method.POST:
          this.app.post(path, ...callbacks);
        case Method.DELETE:
          this.app.delete(path, ...callbacks);
        case Method.PUT:
          this.app.put(path, ...callbacks);
        case Method.PATCH:
          this.app.patch(path, ...callbacks);
      }

      const colored_path = path.replace(
        /:([a-zA-Z]*)/g,
        (e) => ":" + chalk.yellow(e.slice(1))
      );
      const colored_method = Log.info(
        `${method_colors[method](method.padEnd(7))}${colored_path}`
      );
    }

    http.createServer(this.app).listen(port, () => {
      Log.info(`Webserver running on port ${port}`);
    });
  }
}

export default Server;
export { Method, Ok, Response, Endpoint, EndpointHandler };
