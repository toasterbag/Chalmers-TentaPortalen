<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-between.desktop-only
    .py-3
      .fs-4
        span {{ programme.name_en.trim() }}
        //- .fst-italic {{ programme.name_sv }}
      div
        span.pe-2 Code:&nbsp;
          span.fw-bold {{ programme.code }}

  .row.justify-content-between.mobile-only
    .py-3
      .fs-6
        span {{ programme.name_en }}
        //- .fst-italic {{ programme.name_sv }}
      .py-2
        .d-flex.justify-items-between
          .pe-2 Code:&nbsp;
            span.fw-bold {{ programme.code }}

  //- .pt-2.pb-4
  //-   tabs(:entries="nav_items")
  hr
  .row
    transition(name="fade", mode="out-in", :key="$router.fullPath")
      router-view
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "programme",
  data: () => ({
    ready: false,
    nav_items: [
      {
        title: "Survey Analysis",
        route: "course/survey-analysis",
      },
    ],
  }),

  created() {
    this.loadCourse();
  },

  methods: {
    async loadCourse() {
      let res = await Http.get(`programme/${this.$route.params.code}`);
      this.programme = res;
      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
