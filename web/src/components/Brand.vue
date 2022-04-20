<template lang="pug">
.brand
  .font-brand
    .name CoursePortal
    .slogan Tentō, ergo sum
</template>

<script lang="ts">import { defineComponent } from "vue"

//import Http from "../plugins/http";
export default defineComponent({
  name: "Brand",
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.brand {
  user-select: none;
  color: var(--sp-text);
  --font-base: 2.4rem;

  .name {
    font-size: var(--font-base);
  }

  .slogan {
    font-size: calc(var(--font-base) / 3);
  }

  @include above(sm) {
    --font-base: 4rem;
    .name {
      font-size: var(--font-base);
    }

    .slogan {
      font-size: calc(var(--font-base) / 3);
    }
  }
}
</style>
