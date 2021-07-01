// export class GetUpdateStatus implements Endpoint<Context> {
//   method = Method.GET;
//   path = "/api/admin/status";

//   async handler({ headers }: Request, context: Context): Promise<Response> {
//     const pass = headers.authorization;
//     if (pass == context.config.ADMIN_PASSWORD) {
//       return Ok(context.status);
//     }

//     return new Response(400);
//   }
// }
