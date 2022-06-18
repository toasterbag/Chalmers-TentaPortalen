import { defineStore } from "pinia";
import { App } from "vue";
import ToasterPortal from "./component.vue";

export interface ToastOptions {
  icon?: string;
  content: string;
  timeout?: number;
  color?: string;
}

export interface Toast {
  icon?: string;
  content: string;
  exiting: boolean;
  color?: string;
}

export const EXIT_TRANSITION_DURATION = 500;
const DEFAULT_TIMEOUT = 4000;

interface State {
  counter: number;
  toasts: Map<number, Toast>;
}

export const useToastStore = defineStore("Toast", {
  state: (): State => ({ counter: 0, toasts: new Map() }),
  actions: {
    push({ icon, content, timeout = DEFAULT_TIMEOUT, color }: ToastOptions) {
      const id = this.counter++;
      this.toasts.set(id, { icon, content, exiting: false, color });

      setTimeout(async () => {
        this.toasts.set(id, { icon, content, exiting: true });
        await wait(EXIT_TRANSITION_DURATION);
        this.toasts.delete(id);
      }, timeout);
    },
  },
});

export default {
  install: (app: App): void => {
    app.component("Toaster", ToasterPortal);
  },
};
