import Plausible from "plausible-tracker";
import { App } from "vue";

const plausible = Plausible({
  domain: "tenta.davebay.net",
  apiHost: "https://analytics.davebay.net",
});

plausible.enableAutoPageviews();
plausible.enableAutoOutboundTracking();

export const usePlausible = () => plausible