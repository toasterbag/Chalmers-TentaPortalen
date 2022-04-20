<template lang="pug">
div
  .row.d-flex.justify-content-center
    .col-10.col-md-8
      .row.justify-content-between.desktop-only
        .py-3
          .fs-4
            span.bold {{ course.course_code }}
            | &nbsp;
            span {{ course.name_en }}
            .fst-italic {{ course.name_sv }}
          div
            span.pe-4 Owner:&nbsp;
              span.fw-bold {{ course.owner_code }}
            span.pe-2
              a(
                target="_blank",
                :href="`https://student.portal.chalmers.se/sv/chalmersstudier/minkursinformation/Sidor/SokKurs.aspx?course_id=${course.instances[0].study_portal_id}&parsergrp=3`"
              )
                i.fa.fa-home.pe-1
                | View on the student portal

      .row.justify-content-between.mobile-only
        .py-3
          .fs-6
            span {{ course.name_en }}
            .fst-italic {{ course.name_sv }}
          .py-2
            .d-flex.justify-items-between
              .pe-2 Course code:&nbsp;
                span.fw-bold {{ course.course_code }}
              .pe-2 Owner:&nbsp;
                span.fw-bold {{ course.owner_code }}
            .py-2
              a(
                target="_blank",
                :href="`https://student.portal.chalmers.se/sv/chalmersstudier/minkursinformation/Sidor/SokKurs.aspx?course_id=${course.instances[0].study_portal_id}&parsergrp=3`"
              )
                i.fa.fa-home.pe-1
                | View on the student portal

      .pt-2.pb-4
        tabs(:entries="links")

  View
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import RouterView from "../../components/View.vue";

export default defineComponent({
  name: "CourseIndex",
  props: {
    code: {
      required: true,
      type: String,
    }
  },
  async setup(props) {
    const api = useAPI();
    const route = useRoute();
    const links = [
      {
        title: "Exam statistics",
        route: "Course/ExamStatistics",
      },
      {
        title: "Exams & solutions",
        route: "Course/Materials",
      },
      {
        title: "Survey Analysis",
        route: "Course/SurveyAnalysis",
      },
      {
        title: "Surveys & minutes",
        route: "Course/Surveys",
      },
    ];
    const course = await api.fetchCourse(props.code);
    return { route, course, links };
  },
  components: { RouterView }
});
</script>

<style lang="scss" scoped></style>
