import { PrismaClient as CommonClient } from "./clients/common";
import { PrismaClient as RestrictedClient } from "./clients/restricted";

export default {
  common: new CommonClient(),
  restricted: new RestrictedClient(),
};
