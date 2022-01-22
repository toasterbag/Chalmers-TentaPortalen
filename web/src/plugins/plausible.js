import Plausible from "plausible-tracker";

export const plausible = Plausible({
  domain: "tenta.davebay.net",
  apiHost: "https://analytics.davebay.net",
});

export default {
  install: (Vue) => {
    plausible.enableAutoPageviews();
    plausible.enableAutoOutboundTracking();
    Vue.prototype.$plausible = plausible;
  },
};
