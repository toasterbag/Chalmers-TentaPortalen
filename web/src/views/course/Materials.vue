<template lang="pug">
.row.d-flex.justify-content-center
  .col-10.col-lg-8
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

          .row.align-items-center(
            v-for="(exam, index) in exams",
            :key="exam.date",
            :class="{ selected: selected.has(index) }"
          )
            .col-4
              input.form-check-input.me-2(
                v-if="isAdmin",
                type="checkbox",
                :value="selected.has(index)",
                @click="select($event, exam, index)"
              )
              span {{ exam.date }}
            .col-4.col-sm-3
              a.text-primary(v-if="exam.thesis", @click="trackUpload(exam)") Download
              span.text-decoration-underline.text-red.clickable(
                v-else,
                @click="openUploadDialog(exam)"
              ) Missing
            .col-4.col-sm-3
              a.text-primary(v-if="exam.solution", :href="exam.solution.url") Download
              span(v-else-if="exam.thesis && exam.thesis.includes_solution") Included in thesis
              span.text-decoration-underline.text-red.clickable(
                v-else,
                @click="openUploadDialog(exam)"
              ) Missing
            //- .col-2.text-end.desktop-only(v-if="(exam.thesis || exam.solution) && isAdmin")
            //-   .btn.bg-red.text-white Delete
      .row.justify-content-center
        .col-12.fs-4.p-4.text-center
          div We would appreciate any exams and solutions you may by able to provide. 😊
  ActionBar(:show="selected.size > 0")
    .btn.ripple.flat.text-white(@click="setIncludesSolution") Includes solution
    .fa.fa-trash.text-white.clickable(@click="promptDelete")
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref } from "vue";
import { useAPI } from "../../plugins/api";
import { Exam } from "../../plugins/api/types";
import { useDialog } from "../../plugins/dialog";
import { usePlausible } from "../../plugins/plausible";

export default defineComponent({
  name: "CourseMaterialsView",
  props: {
    code: {
      required: true,
      type: String,
    },
  },
  async setup(props) {
    const dialog = useDialog();
    const api = useAPI();
    const { isAdmin } = storeToRefs(api);
    const selected: Ref<Set<number>> = ref(new Set());
    const lastSelected: Ref<number | undefined> = ref(undefined);
    let exams = ref(
      (await api.fetchExams(props.code)).map((e) =>
        Object.assign(e, { selected: false }),
      ),
    );

    const trackUpload = (exam: Exam) => {
      usePlausible().trackEvent("Download exam", {
        props: { date: exam.date, course: exam.course_code },
      });

      window.open(exam.thesis?.url, "_blank");
    };

    const openUploadDialog = async (exam: Exam) => {
      await dialog.open("UploadExamDialog", { exam });
    };

    const select = (event: MouseEvent, exam: Exam, index: number) => {
      // if (event.shiftKey) {
      //   const last = lastSelected.value;
      //   if (last && selected.value.has(last)) {
      //     for (const num of range(index, last, { inclusive: true })) {
      //       selected.value.add(num);
      //     }
      //   }
      // }
      lastSelected.value = index;
      if (selected.value.has(index)) {
        selected.value.delete(index);
        return;
      }
      selected.value.add(index);
    };

    const setIncludesSolution = async () => {
      const state = !selected.value.toArray().some((index) => {
        if (!exams.value[index].thesis) return false;
        return exams.value[index].thesis?.includes_solution;
      });
      console.log(state);

      for (const index of selected.value.values()) {
        const thesis = exams.value[index].thesis;
        if (thesis) {
          await api.updateExamThesis(thesis.id, {
            includesSolution: state,
          });
          thesis.includes_solution = state;
        }
      }
    };

    const promptDelete = async () => {
      const res = await dialog.open("ConfirmDialog", {
        message: "Do you really want to delete these exams?",
      });

      if (res === true) {
        for (const index of selected.value.values()) {
          const thesis = exams.value[index].thesis;
          const solution = exams.value[index].solution;
          if (solution) {
            await api.deleteExamSolution(solution.id);
            exams.value[index].solution = undefined;
          }
          if (thesis) {
            await api.deleteExamThesis(thesis.id);
            exams.value[index].thesis = undefined;
          }
        }
      }
    };

    return {
      exams,
      isAdmin,
      trackUpload,
      select,
      selected,
      openUploadDialog,
      setIncludesSolution,
      promptDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.selected {
  background-color: var(--sp-chart-three);
  border: none;
}

.tenta-table {
  user-select: none;
}
</style>
