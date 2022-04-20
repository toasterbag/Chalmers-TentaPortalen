<template lang="pug">
.row.d-flex.justify-content-center
  .col-10.col-md-8
    .row.justify-content-between.py-md-0.py-3(v-if="exams.isEmpty()")
      .fs-2.text-center No exams found
    .row(v-else)
      .fs-5.py-2
        b.text-blue Tip:&nbsp;
        span Press on a missing exam to upload
      .row.justify-content-center.tenta-table
        .col-12
          .row.header
            .col-4 Date
            .col-4.col-sm-3 Exam
            .col-4.col-sm-3 Solutions

          .row.align-items-center(v-for="exam in exams", :key="exam.date")
            .col-4 {{ exam.date }}
            .col-4.col-sm-3
              a.text-primary(
                v-if="exam.thesis",
                @click="trackUpload(exam)"
              ) Download
              span.text-decoration-underline.text-red.clickable(v-else @click="openUploadDialog(exam)") Missing
            .col-4.col-sm-3
              a.text-primary(v-if="exam.solution", :href="exam.solution.url") Download
              span(v-else-if="exam.thesis && exam.thesis.includes_solution") Included in thesis
              span.text-decoration-underline.text-red.clickable(v-else @click="openUploadDialog(exam)") Missing 
            .col-2.text-end.desktop-only(v-if="(exam.thesis || exam.solution) && isAdmin")
              .btn.bg-red.text-white Delete


      .row.justify-content-center
        .col-12.fs-4.p-4.text-center
          div We would appreciate any exams and solutions you may by able to provide. 😊
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { Exam } from "../../plugins/api/types";
import { useDialog } from "../../plugins/dialog";
import Http, { CONFIG } from "../../plugins/http";
import { usePlausible } from "../../plugins/plausible";

export default defineComponent({
  name: "CourseMaterialsView",
  props: {
    code: {
      required: true,
      type: String,
    }
  },
  async setup(props) {
    const dialog = useDialog();
    const api = useAPI();
    const { isAdmin } = storeToRefs(api);
    let exams = await api.fetchExams(props.code);

    const trackUpload = (exam: Exam) => {
      usePlausible().trackEvent("Download exam", {
        props: { date: exam.date, course: exam.course_code },
      });

      window.open(exam.thesis?.url, "_blank");
    };

    const openUploadDialog = async (exam: Exam) => {
      await dialog.open("UploadExam", { exam });
    }

    return {
      exams,
      isAdmin,
      trackUpload,
      openUploadDialog,
    };
  },
});
</script>
