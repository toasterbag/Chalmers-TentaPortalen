<script lang="ts">
import { defineComponent } from "vue";
import { useAPI } from "../../plugins/api";
import { useLocalization } from "../../plugins/localization";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "CourseSurveys",
  props: {
    code: {
      required: true,
      type: String,
    },
  },
  async setup(props) {
    const api = useAPI();
    const { tl } = storeToRefs(useLocalization());
    let surveys = (await api.fetchCourseSurveys(props.code)).reverse();

    return { surveys, tl };
  },
});
</script>

<template lang="pug">
.row.flex.justify-center
  .col-10.col-lg-8
    .row.justify-between.py-3(v-if="surveys.isEmpty()")
      .fs-2.text-center {{ tl.pages.course.no_surveys_found }}
    .row(v-else)
      .row
        .pb-3 {{ tl.pages.course.hint_minutes }}

      .overflow-x-scroll
        table.tp-table.py-3
          thead
            tr
              th {{ tl.terms.academic_year }}
              th {{ tl.terms.survey }}
          tbody
            tr(v-for="{ academic_year, url } in surveys", :key="academic_year")
              td {{ academic_year }}
              td: a.text-primary(target="_blank", :href="url") Link
</template>
