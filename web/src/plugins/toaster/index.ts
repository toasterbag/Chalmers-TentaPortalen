import { App } from "@vue/runtime-core";
import ToasterComponent from "./toaster.vue";

export interface Toast {
  title?: string;
  content: string;
  timeout?: number;
  progress?: number;
}

export type ToastListener = (toast: Toast) => void;

export class Toaster {
  private callbacks: Array<ToastListener> = [];

  constructor() {}

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
    const toaster = new Toaster();
    app.config.globalProperties.$toaster = toaster;

    app.component("toaster", ToasterComponent);

    app.provide("toaster", toaster);
  },
};
