import { Plugin } from "vue";

export default async (): Promise<Plugin> => {
  const context = import.meta.glob("../components/**/*.vue");

  const components = await Promise
    .all(Object.values(context)
      .map(async (f) => {
        const c = await f();
        return c.default;
      }));

  return {
    install: (app) => {
      for (const c of components.filter(c => !(c.private && c.private == true))) {
        if (!("name" in c)) {
          throw Error("Attempted to register component without name")
        }
        app.component(c.name, c);
      }
    },
  }
}