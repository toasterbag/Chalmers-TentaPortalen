<template lang="pug">
.brand
  .font-brand(:style="style")
    .name CoursePortal
    .slogan Tentō, ergo sum
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Brand",
  props: {
    fontSize: {
      required: false,
    },
  },
  computed: {
    style() {
      return this.fontSize ? { "--font-base": this.fontSize } : {};
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.brand {
  user-select: none;
  color: var(--sp-text);
  --font-base: 2.8rem;

  .name {
    font-size: var(--font-base);
  }

  .slogan {
    font-size: calc(var(--font-base) / 3);
  }

  @include above(md) {
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
