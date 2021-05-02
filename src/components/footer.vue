<template lang="pug">
.sp-footer
  router-link.font-brand.brand.align-self-center.flex-fill(:to="{ name: 'name' }")
    .fs-2 CoursePortal
    div Tentō, ergo sum
  .section
    .text.fs-4 Code
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/toasterbag/course-portal", target="_blank") Code on Github
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/dtekcth/plugg", target="_blank") Exam repository
    div
      i.fab.fa-github.pe-1
      a(href="https://github.com/toasterbag") David "pDave" Hedgren

  .section
    .text.fs-4 Admin
    router-link(:to="{ name: 'admin/import' }") Control panel

  .section
    .text.fs-4 About
    div Maintained by DNS ({{ 'dns' }}@dtek.se)
    div(v-if="last_updated") Last updated {{ last_updated }}
    router-link(:to="{ name: 'feedback' }") Leave feedback
</template>

<script>
import Http from "../plugins/http";
import { formatDistanceToNow } from "date-fns";
export default {
  name: "sp-footer",
  data: () => ({
    last_updated: undefined,
  }),
  async created() {
    const last_updated = (await Http.get("updated")).timestamp;
    this.last_updated = last_updated
      ? formatDistanceToNow(new Date(last_updated), { addSuffix: true })
      : "Never";
  },
};
</script>

<style lang="scss">
.sp-footer {
  display: flex;
  color: var(--sp-text);
  position: absolute;
  width: 100%;
  height: var(--footer-height);
  bottom: 0px;
  background-color: var(--sp-paper);
  padding: 2rem;
  box-sizing: border-box;

  .brand {
    padding: 0 4rem;
    user-select: none;
  }

  .section {
    padding: 0 2rem;
    a:hover {
      color: var(--sp-accent);
    }
  }
}

@media (max-width: 575.98px) {
  .wrapper {
    padding-bottom: 33rem;
  }
  .sp-footer {
    display: block;
    height: 32rem;
    .brand {
      padding: 0rem 2rem;
    }
    .section {
      padding: 1rem 2rem;
    }
  }
}
</style>
