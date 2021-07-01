import "./global";

import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import components from "./plugins/components";
import VuePreferences from "vue-preferences";
import DialogPlugin from "./plugins/dialog";
import ToasterPlugin from "./plugins/toaster";

Vue.use(VuePreferences);

Vue.use(DialogPlugin);
Vue.use(ToasterPlugin);

window.env = {
  ENV: process.env.NODE_ENV,
  HOST_URL: process.env.NODE_ENV == "production" ? "" : "http://localhost:8855",
  API_URL:
    process.env.NODE_ENV == "production"
      ? "/api/v1"
      : "http://localhost:8855/api/v1",
};

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

Vue.directive("tooltip", {
  // When the bound element is inserted into the DOM...
  inserted: function (el, { value }) {
    el.tooltip = new window.bootstrap.Tooltip(el, value);
  },
  update: function (el, { value }) {
    el.tooltip = new window.bootstrap.Tooltip(el, value);
  },
});

Vue.directive("validate", {
  inserted: function (el, fns) {
    el.addEventListener("input", (e) => {
      const val = e.target.value;
      if (!fns.every((f) => f(val))) {
        el.classList.remove("invalid");
      } else {
        el.classList.add("invalid");
      }
    });
  },
  update: function (el, fns) {
    el.addEventListener("input", (e) => {
      const val = e.target.value;
      if (!fns.every((f) => f(val))) {
        el.classList.remove("invalid");
      } else {
        el.classList.add("invalid");
      }
    });
  },
});

import { formatDistanceToNow } from "date-fns";
Vue.filter("distanceToNow", (val) =>
  val ? formatDistanceToNow(new Date(val), { addSuffix: true }) : "never"
);

Vue.config.productionTip = false;
Vue.use(components);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
