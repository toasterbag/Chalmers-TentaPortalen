<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-between.py-md-0.py-3(v-if="surveys.isEmpty()")
    .fs-2.text-center This course has no surveys
  .row(v-else)
    .row
      .pb-3 Minutes can be found on the survey page, if they have been published
    .row.justify-content-left.tenta-table
      .col-6
        .row.header
          .col-6 Academic Year
          .col-6 Survey

        .row.align-items-center(
          v-for="{ academic_year, survey_link } in surveys",
          :key="academic_year"
        )
          .col-6 {{ academic_year }}
          .col-6
            a.text-primary(target="_blank", :href="survey_link") Link
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "course",
  data: () => ({
    ready: false,
    surveys: [],
  }),
  created() {
    this.load();
  },
  methods: {
    async load() {
      let res = await Http.get(`course/${this.$route.params.code}/surveys`);

      this.surveys = res
        .map((survey) => {
          if (survey.language == "Swedish") {
            survey.survey_link = `https://course-eval.portal.chalmers.se/sr/Reports/${survey.course_code}/${survey.academic_year}/LP${survey.start_period}-LP${survey.end_period}/UtanKommentarer`;
          } else if (survey.language == "English") {
            survey.survey_link = `https://course-eval.portal.chalmers.se/sr/Reports/${survey.course_code}/${survey.academic_year}/LP${survey.start_period}-LP${survey.end_period}/WithoutComments`;
          }
          return survey;
        })
        .sort((a, b) => a.academic_year < b.academic_year);

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
