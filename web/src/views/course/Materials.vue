<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref } from "vue";
import { useAPI } from "../../plugins/api";
import { Exam } from "../../plugins/api/types";
import { useDialog } from "../../plugins/dialog";
import { usePlausible } from "../../plugins/plausible";
import { useLocalization } from "../../plugins/localization";

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
    const { tl } = storeToRefs(useLocalization());
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
      exams.value = (await api.fetchExams(props.code)).map((e) =>
        Object.assign(e, { selected: false }),
      );
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
      tl,
    };
  },
});
</script>
<template lang="pug">
.flex.flex-col.justify-center
  .flex.justify-center(v-if="exams.isEmpty()")
    .fs-2.text-center No exams found
  .row(v-else)
    .text-lg.my-2.p-4.bg-primary.text-white.rounded {{ tl.pages.course.hint_upload }}

    .overflow-x-scroll
      table.tp-table
        thead
          tr
            th {{ tl.ui.date }}
            th {{ tl.terms.exam }}
            th {{ tl.terms.solution }}
        tbody
          tr(
            v-for="(exam, index) in exams",
            :key="exam.date",
            :class="{ selected: selected.has(index) }"
          )
            td(v-if="isAdmin")
              input.form-check-input.mr-2(
                type="checkbox",
                :value="selected.has(index)",
                @click="select($event, exam, index)"
              )
            td 
              span {{ exam.date }}
            td
              a.text-primary(v-if="exam.thesis", @click="trackUpload(exam)") {{ tl.ui.download }}
              span.underline.text-accent.cursor-pointer(
                v-else,
                @click="openUploadDialog(exam)"
              ) {{ tl.ui.missing }}
            td
              a.text-primary(v-if="exam.solution", :href="exam.solution.url") {{ tl.ui.download }}
              span(v-else-if="exam.thesis && exam.thesis.includes_solution") {{ tl.ui.incuded_in_thesis }}
              span.underline.text-accent.cursor-pointer(
                v-else,
                @click="openUploadDialog(exam)"
              ) {{ tl.ui.missing }}

          //- .col-2.text-end.desktop-only(v-if="(exam.thesis || exam.solution) && isAdmin")
          //-   .btn.bg-red.text-white Delete

  ActionBar(:show="selected.size > 0")
    .btn.ripple.flat.text-white(@click="setIncludesSolution") Includes solution
    .cursor-pointer.w-10.h-10.relative.rounded(class="hover:bg-gray-300/25")
      .fa.fa-trash.text-white.center(@click="promptDelete")
</template>

<style lang="scss" scoped>
.selected {
  background-color: var(--tp-chart-three);
  border: none;
}

.tp-table {
  user-select: none;
}
</style>
