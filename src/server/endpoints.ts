// const flatten = <C>(
//   tree: EndpointTree<C>,
//   prefix = "",
// ): Array<{ path: string; endpoint: Endpoint<any, C> }> => {
//   return Object.entries(tree).flatMap(([name, val]) => {
//     if (val instanceof Endpoint)
//       return [{ path: `${prefix}/${name}`, endpoint: val }];
//     return flatten(val, `${prefix}/${name}`);
//   });
// };
