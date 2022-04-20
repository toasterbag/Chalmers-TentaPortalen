<template lang="pug">
#footer.d-flex.p-4
  router-link.font-brand.brand.align-self-center.flex-fill.desktop-only(
    :to="{ name: 'Home' }"
  )
    .fs-2 CoursePortal
    div Tentō, ergo sum
  .section
    .text.fs-4 Code
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/toasterbag/course-portal", target="_blank") Code on Github
    //- div
    //-   i.fab.fa-github.pe-1
    //-   a(href="https://github.com/dtekcth/plugg", target="_blank") Exam repository
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/toasterbag") Karl David "pDave" Hedgren

  .section(v-if="isAdmin")
    .text.fs-4 Admin
    router-link(:to="{ name: 'Admin/Import' }") Control panel

  .section
    .text.fs-4 About
    // div Maintained by DNS ({{ 'dns' }}@dtek.se)
    div Maintained by David Hedgren ({{ 'ordf' }}@dtek.se)
    div(v-if="lastUpdated") Last updated {{ lastUpdated }}
    router-link(:to="{ name: 'feedback' }") Leave feedback
</template>

<script lang="ts">
import Http from "../plugins/http";
import { formatDistanceToNow } from "date-fns";
import { ref, defineComponent } from "vue";
import { useAPI } from "../plugins/api";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "Footer",
  setup() {
    const { isAdmin } = storeToRefs(useAPI());
    const lastUpdated = ref("")

    Http.get("updated").then(({ timestamp }) => {
      lastUpdated.value = timestamp
        ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
        : "";
    });

    return {
      isAdmin,
      lastUpdated,
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

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

@include sm {
  .sp-footer {
    display: flex;

    .section {
      padding: 0 2rem;
    }
  }
}
</style>
