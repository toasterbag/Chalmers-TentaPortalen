import "./global";

import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import components from "./plugins/components";

window.env = {
  API_URL:
    process.env.NODE_ENV == "production"
      ? "https://tenta.davebay.net/api"
      : "http://localhost:8855/api",
};

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

Vue.config.productionTip = false;
Vue.use(components);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
