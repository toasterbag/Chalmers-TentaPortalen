import { Method, Response, Ok } from "@app/server";

export default {
  method: Method.POST,
  path: "/auth",
  auth: ["admin"],

  handler: async (): Promise<Response> => {
    return Ok({});
  },
};
