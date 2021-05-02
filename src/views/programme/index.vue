<template lang="pug">
.container
  div(v-if="this.ready")
    .row.justify-content-between.mb-2
      tabs(:entries="nav_items")
        .fs-4
          span.bold {{ programme.code }}
          | &nbsp;
          span {{ programme.name_en }}
          .fst-italic {{ programme.name_sv }}

    .row.justify-content-center
      .col-12
        transition(name="fade", mode="out-in")
          router-view
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "course",
  data: () => ({
    ready: false,
    nav_items: [
      {
        title: "Exam statistics",
        route: "programme/exam-statistics",
      },
      {
        title: "Survey",
        route: "programme/course-survey",
      },
    ],

    programme: {
      name_sv: undefined,
      name_en: undefined,
      code: undefined,
    },
  }),

  created() {
    this.loadProgramme();
  },
  methods: {
    async loadProgramme() {
      let res = await Http.get(`programme/${this.$route.params.code}`);
      this.programme = res;
      this.ready = true;
      Http.log("programme", this.$route.params.code);
    },
  },
};
</script>

<style lang="scss" scoped></style>
