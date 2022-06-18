<template lang="pug">
#footer.d-flex.p-4
  div.font-brand.brand.align-self-center.flex-fill
    .fs-2 CoursePortal
    div Tentō, ergo sum

  .section
    .fs-4 Code
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/toasterbag/course-portal", target="_blank") Code on Github
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/toasterbag") Karl David "pDave" Hedgren

  .section(v-if="isAdmin")
    .fs-4 Admin
    router-link(:to="{ name: 'Admin/Import' }") Control panel

  .section
    .fs-4 About
    div Maintained by David Hedgren ({{ 'david.hedgren' }}@dtek.se)
    router-link(:to="{ name: 'feedback' }") Leave feedback
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAPI } from "../../plugins/api";

export default defineComponent({
  name: "DesktopFooter",
  private: true,
  setup() {
    const { isAdmin } = storeToRefs(useAPI());

    return {
      isAdmin,
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

#footer {
  color: var(--sp-text);
  background-color: var(--sp-paper);
  box-sizing: border-box;
  z-index: var(--z-bottom);

  a:hover {
    color: var(--sp-blue);
  }

  .section {
    padding: 1rem 2rem;
  }

  .brand {
    color: unset;
    padding: 0 4rem;
    user-select: none;
  }
}
</style>
