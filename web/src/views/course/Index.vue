<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAPI } from "../../plugins/api";
import RouterView from "../../components/View.vue";
import { storeToRefs } from "pinia";
import { useLocalization } from "../../plugins/localization";

export default defineComponent({
  name: "CourseIndex",
  props: {
    code: {
      required: true,
      type: String,
    },
  },
  async setup(props) {
    const api = useAPI();
    const route = useRoute();
    const { tl } = storeToRefs(useLocalization());
    document.title = `TentaPortalen | ${route.params.code}`;

    const links = [
      {
        title: tl.value.pages.course.nav.exam_statistics,
        route: "Course/ExamStatistics",
      },
      {
        title: tl.value.pages.course.nav.old_theses,
        route: "Course/Materials",
      },
      {
        title: tl.value.pages.course.nav.survey_analysis,
        route: "Course/SurveyAnalysis",
      },
      {
        title: tl.value.pages.course.nav.old_surveys,
        route: "Course/Surveys",
      },
    ];
    const course = await api.fetchCourse(props.code);
    return { route, course, links, tl };
  },
  components: { RouterView },
});
</script>

<template lang="pug">
.view-margin
  .flex.justify-between
    .py-3
      .text-lg.font-semibold.font-header
        span {{ course.name_en }}
        .italic {{ course.name_sv }}
      .py-2
        .flex.justify-between.flex-col(class="md:gap-4 md:flex-row")
          .pr-2 {{ tl.ui.course_code }}:&nbsp;
            span.font-bold {{ course.course_code }}
          .pr-2 {{ tl.terms.owner }}:&nbsp;
            span.font-bold {{ course.owner_code }}
          .pr-2(v-if="course.studentBoard") {{ tl.terms.academic_council }}:&nbsp;
            span.font-bold {{ course.studentBoard.email }}
        .py-2
          a(
            target="_blank",
            :href="`https://student.portal.chalmers.se/sv/chalmersstudier/minkursinformation/Sidor/SokKurs.aspx?course_id=${course.instances[0].study_portal_id}&parsergrp=3`"
          )
            i.fa.fa-home.pr-1
            | {{ tl.pages.course.view_on_student_portal }}

  .pt-2.mb-4
    .overflow-x-scroll
      .flex.items-center.gap-4(class="w-[500px] md:w-full")
        Link.tab-primary.pb-2(
          v-for="{ title, route } in links",
          :to="{ name: route }",
          :key="route"
        )
          span.font-bold.text-primary.px-4.text-lg {{ title }}

  View
</template>
