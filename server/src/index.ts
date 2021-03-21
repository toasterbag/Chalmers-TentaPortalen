import Server from "@app/server";
import Context from "@app/context";
import importFromDatasheet from "@app/import";
import { makeLogger } from "@app/logger";
const Logger = makeLogger({ label: "Tenta" });

import CourseRoutes from "./routes/courses";
import AnalyticsRoutes from "./routes/analytics";
import AdminRoutes from "./routes/admin";

const main = async () => {
  const state = await Context.initialize();
  const server = new Server(state);


  let routes = [CourseRoutes, AnalyticsRoutes, AdminRoutes].flatMap((e) => e);
  for (let route of routes) {
    server.route(new route());
  }

  server.serve(8855);
};

main().catch((e) => console.error(e));
