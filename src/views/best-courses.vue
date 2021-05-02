<template lang="pug">
div(v-if="this.ready")
  .p-md-5.fs-4 The Best performing courses over the last 3 years
  .row.justify-content-center.tenta-table.p-md-5
    .col-12
      .row.header
        .col-4 Code
        .col-2 Year
        .col-2 Overall impression
        .col-2 Respondents
        .col-2 Answer frequency

      .row(
        v-for="course in list",
        :key="course.course_code + course.academic_year"
      )
        .col-4.text-primary
          router-link(
            :to="{ name: 'course/exam-statistics', params: { code: course.course_code } }"
          ) {{ course.course_code }}
        .col-2 {{ course.academic_year }}
        .col-2.text-end {{ course.total_impression_mean.roundTo(2) }}
        .col-2.text-end {{ course.respondents }}
        .col-2.text-end {{ course.answer_frequency.roundTo(2) }}%
</template>

<script>
import Http from "../plugins/http";

export default {
  name: "worst-courses",
  data: () => ({
    ready: false,
    list: [],
  }),
  watch: {
    $route() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const res = await Http.get(`courses/best`);
      this.list = res;

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
