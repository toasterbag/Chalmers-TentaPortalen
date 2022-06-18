<template lang="pug">
.row.d-flex.justify-content-center
  .col-10.col-lg-8
    .row.justify-content-between.py-3(v-if="surveys.isEmpty()")
      .fs-2.text-center Found no surveys for this course
    .row(v-else)
      .row
        .pb-3 Minutes can be found on the survey page, if they have been published
      .row.justify-content-left.tenta-table
        .col-12
          .row.header
            .col-8 Academic Year
            .col-4 Survey

          .row.align-items-center(
            v-for="{ academic_year, url } in surveys",
            :key="academic_year"
          )
            .col-8 {{ academic_year }}
            .col-4
              a.text-primary(target="_blank", :href="url") Link
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAPI } from "../../plugins/api";

export default defineComponent({
  name: "CourseSurveys",
  props: {
    code: {
      required: true,
      type: String,
    }
  },
  async setup(props) {
    const api = useAPI();
    let surveys = (await api.fetchCourseSurveys(props.code)).reverse()

    return { surveys }
  }
});
</script>

<style lang="scss" scoped></style>
