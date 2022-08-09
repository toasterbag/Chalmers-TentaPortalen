<template lang="pug">
.p-3.px-4.fixed.bg-primary.left-0.transition.w-screen.actionbar(
  :class="{ show: show }"
)
  .flex.justify-end.items-center.gap-3
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

  &.show {
    bottom: 0;
  }
}
</style>
