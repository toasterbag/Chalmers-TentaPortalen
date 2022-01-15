import DialogPortal from "./portal.vue";

class DialogManager {
  dialogs = {};
  portal = null;

  constructor(Vue) {
    const context = require.context("../../components/dialogs", true, /\.vue$/);
    const components = context
      .keys()
      .map(context)
      .map((c) => c.default);

    components.forEach((c) => {
      this.dialogs[c.name.replace("-dialog", "")] = Vue.extend(c);
    });
  }

  assure_registered() {
    if (this.portal == null) {
      throw new Error(
        "The dialog portal has not been registered. Does the dialog-portal element exist?"
      );
    }
  }

  register(el) {
    this.portal = el;
  }

  open(dialog, props = {}) {
    this.assure_registered();
    if (!dialog) {
      throw new Error("Argument dialog is missing");
    }

    return this.portal.open(this.dialogs[dialog], props);
  }

  hide() {
    this.assure_registered();
    return this.portal.hide();
  }
}

export default {
  install: (app, conf) => {

    app.config.globalProperties.$dialog = new DialogManager(app);
    app.component("dialog-portal", DialogPortal);
  },
};
