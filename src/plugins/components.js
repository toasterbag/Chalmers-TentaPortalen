export default {
  install: (Vue) => {
    const context = require.context("../components", true, /\.vue$/);
    const components = context.keys().map(context);

    const Components = {};
    Components.install = function install(Vue) {
      components.forEach((c) => {
        Vue.component(c.default.name, c.default);
      });
    };

    Vue.use(Components);
  },
};
