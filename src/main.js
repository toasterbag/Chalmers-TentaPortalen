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

const should_use_production_api = process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging";

window.env = {
  ENV: process.env.NODE_ENV,
  PUBLIC_URL: should_use_production_api ? "" : "http://localhost:10007",
  API_URL:
    should_use_production_api
      ? "/api/v1"
      : "http://localhost:10007/api/v1",
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


// const chart_comments = {
//   id: "comments",
//   beforeDraw: function (chart, args, options) {
//       const ctx = chart.ctx;

//       const area = chart.chartArea;

//       if(chart.scales.x._gridLineItems) {
//         for(const {index, color} of options) {
//           const _index = chart.data.labels.findIndex(e => e == index)
//           const datapoint = chart.scales.x._gridLineItems[_index]
//           if(datapoint !== undefined) {
//             ctx.strokeStyle = color ?? "rgb(91, 142, 125)";
//             ctx.lineWidth = 3;

//             ctx.beginPath();
//             ctx.moveTo(datapoint.x1, area.bottom);
//             ctx.lineTo(datapoint.x1, area.top);
//             ctx.closePath();
//             ctx.stroke();
//           }
//         }
//       }
//   },
// };

// Chart.register(chart_comments);

// import { formatDistanceToNow } from "date-fns";
// Vue.filter("distanceToNow", (val) =>
//   val ? formatDistanceToNow(new Date(val), { addSuffix: true }) : "never"
// );

Vue.config.productionTip = false;
Vue.use(components);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
