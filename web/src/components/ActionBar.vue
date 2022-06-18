<template lang="pug">
.p-3.px-4.fixed.bg-primary.left-0.actionbar(:class="{ show: show }")
  .d-flex.justify-content-end.align-items-center.gap-3
    slot
</template>

<script lang="ts">
import { defineComponent } from "vue";

//import Http from "../plugins/http";
export default defineComponent({
  name: "ActionBar",
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss" scoped>
.actionbar {
  bottom: -100px;
  transition: 0.3s ease-out;

  &.show {
    bottom: 0;
    transition: 0.3s ease-out;
  }
}
</style>
