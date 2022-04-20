import { defineStore } from "pinia";

interface State {
  isDesktop: boolean;
}

export const useApp = defineStore("App", {
  state: (): State => {
    const state = {
      isDesktop:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--is-desktop",
        ) === "true",
    };

    return state;
  },
});
