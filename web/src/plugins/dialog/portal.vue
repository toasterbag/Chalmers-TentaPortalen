<template lang="pug">
.dialog-portal
  #modal(:class="{ show: isOpen }")
    .backdrop(@click="hide")
    .vv-dialog.p-3(@keydown.esc="hide")
      component(
        :is="component",
        v-bind="props",
        @hide="hide",
        @submit="submit",
        ref="content"
      )
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useDialog } from ".";
export default defineComponent({
  name: "DialogPortal",
  setup() {
    const dialog = useDialog();
    const { isOpen, props, component } = storeToRefs(useDialog());

    return {
      isOpen,
      component,
      props,
      hide: dialog.hide,
      submit: dialog.submit,
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

#modal {
  position: relative;
  pointer-events: none;

  &.show {
    pointer-events: unset;

    .backdrop {
      opacity: 1;
    }
    .vv-dialog {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);

    opacity: 0;
    transition: all 0.2s;
  }

  .vv-dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    min-width: 700px;
    max-width: 700px;
    @include below("sm") {
      min-width: 90vw;
    }

    z-index: 1050;

    opacity: 0;
    transform: translate(-50%, -55%);
    transition-delay: 0.1s;
    transition: all 0.3s;
  }
}
</style>
