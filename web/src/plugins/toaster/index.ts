import { App } from "@vue/runtime-core";
import ToasterComponent from "./toaster.vue";

interface Toast {
  title?: string,
  content: string,
  timeout?: number,
  progress?: number,
}

type ToastListener = (toast: Toast) => void

class Toaster {
  private callbacks: Array<ToastListener> = [];

  constructor() { }

  on_toast(fn: ToastListener) {
    this.callbacks.push(fn);
  }
  /*
  {
    title: String
    content: String
    progress: Number
    timeout: Number
    icon: String
  }
  */
  toast(toast: Toast) {
    toast.timeout ??= 4000;
    for (const fn of this.callbacks) {
      fn(toast);
    }
  }
}


export default {
  install: (app: App) => {
    app.config.globalProperties.$toaster = new Toaster();

    const root = new Vue({
      render: (createElement) => createElement(ToasterComponent),
    });

    root.$mount(document.body.appendChild(document.createElement("div")));
  },
};
