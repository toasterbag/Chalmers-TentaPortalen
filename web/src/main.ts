import "./global";

import { createApp } from 'vue'

import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import components from "./plugins/components";
import DialogPlugin from "./plugins/dialog";
import ToasterPlugin from "./plugins/toaster";
import { Teleport, TeleportTarget } from "./plugins/teleport";


const should_use_production_api = process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging";

window.env = {
  ENV: process.env.NODE_ENV,
  PUBLIC_URL: should_use_production_api ? "" : "http://localhost:10006",
  API_URL:
    should_use_production_api
      ? "/api/v1"
      : "http://localhost:10006/api/v1",
};

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Vue.directive("tooltip", {
//   // When the bound element is inserted into the DOM...
//   inserted: function (el, { value }) {
//     el.tooltip = new window.bootstrap.Tooltip(el, value);
//   },
//   update: function (el, { value }) {
//     el.tooltip = new window.bootstrap.Tooltip(el, value);
//   },
// });

// Vue.directive("validate", {
//   inserted: function (el, fns) {
//     el.addEventListener("input", (e) => {
//       const val = e.target.value;
//       if (!fns.every((f) => f(val))) {
//         el.classList.remove("invalid");
//       } else {
//         el.classList.add("invalid");
//       }
//     });
//   },
//   update: function (el, fns) {
//     el.addEventListener("input", (e) => {
//       const val = e.target.value;
//       if (!fns.every((f) => f(val))) {
//         el.classList.remove("invalid");
//       } else {
//         el.classList.add("invalid");
//       }
//     });
//   },
// });




// Chart.register(chart_comments);
// Chart.defaults.font = {
//   // family: "NunitoNunito",
// };


// Vue.use(VuePreferences);

Vue.use(DialogPlugin);
Vue.use(ToasterPlugin);
Vue.component("teleport", Teleport);
Vue.component("teleport-target", TeleportTarget);
Vue.use(components);

const app = createApp(App).use(Router).use(DialogPlugin);

app.mount('#app')