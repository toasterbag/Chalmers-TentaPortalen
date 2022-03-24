<template lang="pug">
.dialog-portal
  .modal.fade(ref="modal")
    .modal-dialog.modal-lg.modal-dialog-centered(
      @keydown.esc="resolve(undefined)"
    )
      component(
        :is="dialog_component",
        v-bind="child_props",
        @hide="resolve(undefined)",
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

<style lang="scss">
.modal {
  &.hidden {
    display: none;
  }

  .modal-content {
    border: unset;
  }

  .modal-body {
    min-height: 300px;
    transition: height 0.3s ease;
  }
}
</style>
