<template lang="pug">
.modal-content
  .modal-header.fs-2.fw-light Upload exam {{ exam.date }}
  .modal-body
    .center(v-if="loading")
      .spinner-border.text-primary(role="status")
        span.visually-hidden Loading...
    div(v-else)
      .row
        .col-md-6
          .fs-4.fw-light Exam
          sp-upload-field(v-model="exam_file", text="Click or drop exam here")
        .col-md-6
          .fs-4.fw-light Solution
          sp-upload-field(
            v-model="solution_file",
            text="Click or drop solution here"
          )
      //- .row.pt-4
      //-   .col-12
      //-     .fs-4.fw-light Attachments
      //-     sp-upload-field(
      //-       v-model="attachments",
      //-       text="Click or drop attachments here",
      //-       :multi="true"
      //-     )
      .d-flex.justify-content-end.pt-4
        .form-check
          input#includes-solution.form-check-input(
            type="checkbox",
            v-model="includes_solution"
          )
          label.form-check-label(for="includes-solution")
            | Solutions are included in the exam
  .modal-footer
    .btn.flat.text-blue(@click="submit") Upload
    .btn.flat.text-red(@click="$dialog.hide()") Close
</template>

<script>
export default {
  name: "upload-exam-dialog",
  props: ["exam"],
  data: () => ({
    loading: false,
    exam_file: [],
    solution_file: [],
    attachments: [],
    includes_solution: false,
  }),
  async created() {},
  methods: {
    async submit_exam() {
      var formData = new FormData();
      if (this.exam_file.size > 200 * 1000 * 1000) {
        this.error = "File too big";
        return;
      }
      formData.append("thesis", this.exam_file[0]);

      const query = {
        course_code: this.exam.course_code,
        date: this.exam.date,
        includes_solution: this.includes_solution,
      };

      let queryString = Object.entries(query)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join("&");

      return fetch(`${global.env.API_URL}/exams/thesis?${queryString}`, {
        method: "POST",
        body: formData,
      });
    },
    async submit_solution() {
      var formData = new FormData();
      if (this.exam_file.size > 200 * 1000 * 1000) {
        this.error = "File too big";
        return;
      }
      formData.append("solution", this.solution_file[0]);

      const query = {
        course_code: this.exam.course_code,
        date: this.exam.date,
      };

      let queryString = Object.entries(query)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join("&");

      return fetch(`${global.env.API_URL}/exams/solution?${queryString}`, {
        method: "POST",
        body: formData,
      });
    },
    async submit() {
      this.loading = true;
      const responses = [];
      if (this.exam_file[0]) {
        responses.push(this.submit_exam());
      }
      if (this.solution_file[0]) {
        responses.push(this.submit_solution());
      }
      let result = await Promise.all(responses);
      let isError = result.reduce((err, next) => err || !next.ok, false);
      await window.wait(1000);
      if (isError) {
        this.$toast({
          style: "error",
          title: "Something went wrong",
          content: "The admin has been informed.",
        });
      } else {
        this.$toast({
          style: "success",
          content: "Thanks for your contribution!",
        });
      }

      this.$plausible.trackEvent("Upload exam", {
        props: { course: this.exam.course_code },
      });

      this.$emit("submit", undefined);
    },
  },
};
</script>

<style lang="scss"></style>
