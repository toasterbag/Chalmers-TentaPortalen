<template lang="pug">
.dialog-portal
  .modal.fade(ref="modal")
    .modal-dialog.modal-lg.modal-dialog-centered(@keydown.esc="hide")
      component(
        :is="dialog_component",
        v-bind="child_props",
        @hide="hide",
        @submit="resolve",
        ref="content"
      )
</template>

<script>
export default {
  name: "dialog-portal",
  data: () => ({
    isOpen: false,
    dialog_component: null,
    child_props: {},
    modal: null,
    resolver: () => {},
  }),
  props: {
    dialog: {
      default: null,
    },
  },
  async mounted() {
    this.$dialog.register(this);
    this.modal = new global.bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    open(component, props) {
      this.hide();

      this.dialog_component = component;
      this.child_props = props;
      this.modal.show();

      return new Promise((resolve) => (this.resolver = resolve));
    },
    hide() {
      this.modal.hide();
      this.dialog_component = null;
    },
    resolve(e) {
      this.resolver(e);
      this.hide();
      this.resolver = () => {};
    },
  },
};
</script>

<style lang="scss" scoped>
.modal.hidden {
  display: none;
}
</style>
