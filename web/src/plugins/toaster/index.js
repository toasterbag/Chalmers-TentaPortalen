import ToasterComponent from "./toaster.vue";

class Toaster {
  callbacks = [];

  constructor() {}

  on(fn) {
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
  emit(toast) {
    for (let fn of this.callbacks) {
      fn(toast);
    }
  }
}

const toaster = new Toaster();

export const toast = ({
  content,
  title,
  timeout = 4000,
  progress = 100,
  style,
}) => {
  toaster.emit({
    title,
    content,
    timeout,
    progress,
    style,
  });
};

export const onToast = (cb) => toaster.on(cb);

export default {
  install: (Vue) => {
    Vue.prototype.$toast = toast;
    Vue.prototype.$onToast = onToast;

    const root = new Vue({
      render: (createElement) => createElement(ToasterComponent),
    });

    root.$mount(document.body.appendChild(document.createElement("div")));
  },
};
