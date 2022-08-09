<template lang="pug">
.bg-background.p-4.flex.flex-col.gap-4
  .flex.justify-between.items-center
    h2 Upload exam
    .text-lg {{ exam.date }}
  .center(v-if="loading")
    .spinner-border.text-primary(role="status")
      span.visually-hidden Loading...
  .flex.flex-col.gap-8(v-else)
    .grid.grid-cols-2.gap-4
      .col-span-1
        .text-xl.font-bold Exam
        UploadField(v-model="examFile", text="Click or drop exam here")
      .col-span-1
        .text-xl.font-bold Solution
        UploadField(v-model="solutionFile", text="Click or drop solution here")

    .flex.justify-between
      label Solutions are included in the exam
      RetroSwitch(v-model="includesSolution")

  .border-b.border-base-300
  .flex.gap-4.justify-end
    .btn.bg-blue(@click="submit") Upload
    .btn.bg-red(@click="$emit('hide')") Close
</template>

<script lang="ts">
import { defineComponent, Ref, ref, toRefs, PropType, watch } from "vue";
import { CONFIG } from "../../plugins/http";
import { usePlausible } from "../../plugins/plausible";
import { useToastStore } from "../../plugins/toaster";
import { Exam } from "../../plugins/api/types";
import { isDefined } from "../../std/index";

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

    // watch(examFile, async () => {
    //   if (examFile.value !== undefined) {
    //     const formData = new FormData();
    //     if (examFile.value && examFile.value.size > 200 * 1000 * 1000) {
    //       error.value = "File too big";
    //       return;
    //     }
    //     formData.append("thesis", examFile.value);

    //     const res = await fetch(`${CONFIG.API_URL}/exams/thesis/parse`, {
    //       method: "POST",
    //       body: formData,
    //     });
    //   }
    // });

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
      const responses = [];
      responses.push(submitExam());
      responses.push(submitSolution());

      let result = await (await Promise.all(responses)).filter(isDefined);
      let isOk = result.reduce((err, next) => err || (next && next.ok), false);
      if (isOk) {
        toast.push({
          // style: "success",
          content: "Thanks for your contribution!",
        });
      } else {
        const getError = async () =>
          (await Promise.all(result.map((res) => res.json())))
            .flatMap((e) => e)
            .first()?.message;
        toast.push({
          color: "var(--sp-error)",
          // title: "Something went wrong",
          content: await getError(),
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
