<template lang="pug">
div
  .hide-above-md
    MobileFooter
  .hide-below-md
    DesktopFooter
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DesktopFooter from "./DesktopFooter.vue";
import MobileFooter from "./MobileFooter.vue";
export default defineComponent({
  name: "Footer",
  components: {DesktopFooter, MobileFooter}
});
</script>

<style lang="scss" scoped>

</style>
