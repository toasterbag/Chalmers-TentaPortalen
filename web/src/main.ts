import "./std/global";
import "intl-pluralrules";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Chart, registerables } from "chart.js";
import { FluentBundle, FluentResource } from "@fluent/bundle";

import App from "./App.vue";
import { router } from "./router";
import loadComponents from "./plugins/components";
import { createDialogPlugin } from "./plugins/dialog";
import ToasterPlugin from "./plugins/toaster";

import { CommentPlugin } from "./plugins/charts/comments";
import { LocalStorePlugin } from "./plugins/preferences";

Chart.register(...registerables);
Chart.register(CommentPlugin);

Chart.defaults.font = {
  ...Chart.defaults.font,
  family: "Nunito",
};

const theme = localStorage.getItem("tp-theme");
document.documentElement.dataset["theme"] = theme ?? "light";

const start = async () => {
  const ComponentPlugin = await loadComponents();
  const DialogPlugin = await createDialogPlugin();
  const pinia = createPinia();
  pinia.use(LocalStorePlugin);
  const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(ComponentPlugin)
    .use(DialogPlugin)
    .use(ToasterPlugin);

  app.mount("#app");
};

start();
