import { App, VueElement } from "vue";
import { defineStore } from "pinia";
import DialogPortal from "./portal.vue";

type Resolver = (value: unknown) => void;
interface State {
  isOpen: boolean;
  props: any;
  component: VueElement | undefined;
  components: Map<string, VueElement>;
  resolver?: Resolver;
}

export const useDialog = defineStore("Dialog", {
  state: (): State => ({
    isOpen: false,
    component: undefined,
    components: new Map(),
    props: {},
    resolver: undefined,
  }),
  actions: {
    async open(name: string, props?: any) {
      await this.hide();

      this.props = props;
      this.component = this.components.get(name);
      this.isOpen = true;

      return new Promise((resolve) => {
        this.resolver = resolve;
      });
    },
    async submit(val: any) {
      this.isOpen = false;
      await window.wait(100);
      this.component = undefined;
      if (this.resolver) {
        this.resolver(val);
        this.resolver = undefined;
      }
      this.props = {};
    },
    async hide() {
      return this.submit(undefined);
    },
    register(component: VueElement) {
      if (!("name" in component)) throw Error("Missing component name");
      this.components.set((component as any).name, component);
    },
  },
});

export const createDialogPlugin = async () => {
  const context = import.meta.glob("../../components/dialogs/*.vue");
  const pending = Object.values(context).map((f) => f());

  const components = (await Promise.all(pending)).map((e) => e.default);

  return {
    install: (app: App) => {
      const dialog = useDialog();
      for (const component of components) {
        dialog.register(component);
      }
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          dialog.hide();
        }
      });
      app.component("DialogPortal", DialogPortal);
    },
  };
};
