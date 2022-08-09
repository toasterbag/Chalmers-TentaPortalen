<template lang="pug">
.brand
  .font-display.text-base-content(:style="style")
    .name.font-bold TentaPortalen
    .slogan.font-semibold Tentō, ergo sum
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Brand",
  props: {
    size: {
      required: false,
    },
  },
  computed: {
    style() {
      return this.size ? { "--font-base": this.size } : {};
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.brand {
  user-select: none;
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
