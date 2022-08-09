import { defineStore, PiniaPluginContext } from "pinia";

interface State {
  hideReexams: boolean;
  stackBars: boolean;
  displayValuesAsPercent: boolean;
  themeDummy: boolean;
}

export function LocalStorePlugin({ store }: PiniaPluginContext) {
  store.$subscribe(({ storeId }, state) => {
    if (storeId === "Preferences") {
      localStorage.setItem("preferences", JSON.stringify(state));
    }
  });
}

export const usePreferences = defineStore("Preferences", {
  state: (): State => {
    const state = {
      hideReexams: true,
      stackBars: true,
      displayValuesAsPercent: true,
      themeDummy: true,
    };

    const data = localStorage.getItem("preferences");
    if (data !== null) {
      const storedState = JSON.parse(data);
      Object.assign(state, storedState);
    }
    return state;
  },
  getters: {
    unit: (state) => {
      return state.displayValuesAsPercent ? "%" : "";
    },
  },
});
