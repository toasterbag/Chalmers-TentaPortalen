<template lang="pug">
.modal-content
  .modal-header.fs-2.fw-light Upload exam
    .fs-5 {{ exam.date }}
  .modal-body
    .center(v-if="loading")
      .spinner-border.text-primary(role="status")
        span.visually-hidden Loading...
    div(v-else)
      .row
        .col-md-6
          .fs-4.fw-light Exam
          UploadField(v-model="examFile", text="Click or drop exam here")
        .col-md-6
          .fs-4.fw-light Solution
          UploadField(
            v-model="solutionFile",
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
            v-model="includesSolution"
          )
          label.form-check-label(for="includes-solution")
            | Solutions are included in the exam

  .modal-footer
    .btn.bg-blue(@click="submit") Upload
    .btn.bg-red(@click="$emit('hide')") Close
</template>

<script lang="ts">
import { defineComponent, Ref, ref, toRefs, PropType, watch } from "vue";
import { CONFIG } from "../../plugins/http";
import { usePlausible } from "../../plugins/plausible";
import { useToastStore } from "../../plugins/toaster";
import { Exam } from "../../plugins/api/types";

export default defineComponent({
  name: "UploadExamDialog",
  props: {
    exam: {
      type: Object as PropType<Exam>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const toast = useToastStore();
    const plausible = usePlausible();
    const { exam } = toRefs(props);
    const error = ref("");
    const loading = ref(false);

    const includesSolution = ref(false);
    const examFile: Ref<Blob | undefined> = ref(undefined);
    const solutionFile: Ref<Blob | undefined> = ref(undefined);

    watch(examFile, async () => {
      if (examFile.value !== undefined) {
        const formData = new FormData();
        if (examFile.value && examFile.value.size > 200 * 1000 * 1000) {
          error.value = "File too big";
          return;
        }
        formData.append("thesis", examFile.value);

        const res = await fetch(`${CONFIG.API_URL}/exams/thesis/parse`, {
          method: "POST",
          body: formData,
        });
      }
    });

    const submitExam = () => {
      if (examFile.value !== undefined) {
        const formData = new FormData();
        if (examFile.value && examFile.value.size > 200 * 1000 * 1000) {
          error.value = "File too big";
          return;
        }
        formData.append("thesis", examFile.value);

        const query = {
          code: exam.value.course_code,
          date: exam.value.date,
          withSolution: includesSolution.value,
        };

        let queryString = Object.entries(query)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join("&");

        return fetch(`${CONFIG.API_URL}/exams/thesis?${queryString}`, {
          method: "POST",
          body: formData,
        });
      }
      return Promise.resolve(undefined);
    };

    const submitSolution = () => {
      if (solutionFile.value !== undefined) {
        const formData = new FormData();
        if (examFile.value && examFile.value.size > 200 * 1000 * 1000) {
          error.value = "File too big";
          return;
        }
        formData.append("solution", solutionFile.value);

        const query = {
          code: exam.value.course_code,
          date: exam.value.date,
          withSolution: false,
        };

        let queryString = Object.entries(query)
          .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
          .join("&");

        return fetch(`${CONFIG.API_URL}/exams/solution?${queryString}`, {
          method: "POST",
          body: formData,
        });
      }
      return Promise.resolve(undefined);
    };

    const submit = async () => {
      loading.value = true;
      const responses = [];
      responses.push(submitExam());
      responses.push(submitSolution());

      let result = await Promise.all(responses);
      let isError = result.reduce(
        (err, next) => err || next === undefined || !next.ok,
        false,
      );
      await window.wait(1000);
      if (isError) {
        toast.push({
          // style: "error",
          // title: "Something went wrong",
          content: "Something went wrong, The admin has been informed.",
        });
      } else {
        toast.push({
          // style: "success",
          content: "Thanks for your contribution!",
        });
      }

      plausible.trackEvent("Upload exam", {
        props: { course: exam.value.course_code },
      });

      emit("submit", undefined);
    };

    return {
      submit,
      loading,
      examFile,
      solutionFile,
      includesSolution,
    };
  },
});
</script>

<style lang="scss"></style>
