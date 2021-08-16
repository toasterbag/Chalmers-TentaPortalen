<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-between.py-md-0.py-3(v-if="exams.isEmpty()")
    .fs-2.text-center This course has no exams
  .row(v-else)
    .row.justify-content-center.tenta-table
      .col-12
        .row.header
          .col-3 Date
          .col-2 Exam
          .col-2 Solutions
          .col-3 Attachments

        .row.align-items-center(v-for="exam in exams", :key="exam.date")
          .col-3 {{ exam.date }}
          .col-2
            a.text-primary(v-if="exam.thesis", :href="exam.thesis.url") Download
            span(v-else) Missing
            //sp-upload(@input="uploadExam(exam, $event)")
          .col-2
            a.text-primary(v-if="exam.solution", :href="exam.solution.url") Download
            span(v-else-if="exam.thesis && exam.thesis.includes_solution") Included in thesis
            span(v-else) Missing
          .col-3
          .col-2.text-end
            .btn.bg-primary.text-white(
              v-if="!(exam.thesis && (exam.solution || exam.thesis.includes_solution))",
              @click="$dialog.open('upload-exam', { exam })"
            ) Upload

    .row.justify-content-center
      .col-12.fs-4.p-4.text-center
        div We would appreciate any exams and solutions you may by able to provide. 😊
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "course",
  data: () => ({
    ready: false,
    exams: [],
  }),
  watch: {
    $route() {
      this.loadCourse();
    },
  },
  created() {
    this.loadCourse();
  },
  methods: {
    async loadCourse() {
      let res = await Http.get(`course/${this.$route.params.code}/exams`);

      this.exams = res
        .map((exam) => {
          if (exam.thesis) {
            exam.thesis.url = `${global.env.HOST_URL}/public/courses/${exam.course_code}/${exam.date}/exam.${exam.thesis.filetype}`;
          }
          if (exam.solution) {
            exam.solution.url = `${global.env.HOST_URL}/public/courses/${exam.course_code}/${exam.date}/solution.${exam.solution.filetype}`;
          }
          return exam;
        })
        .sort((a, b) => a.date < b.date);

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
