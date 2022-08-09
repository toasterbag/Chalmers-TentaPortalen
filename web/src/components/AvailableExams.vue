<script lang="ts">
import { useAPI } from "@plugins/api";
import { useLocalization } from "@plugins/localization";
import { storeToRefs } from "pinia";
import { onMounted, ref, Ref } from "vue";

export default {
  name: "AvailableExams",
  setup() {
    const { tl } = storeToRefs(useLocalization());
    const api = useAPI();
    const exams: Ref<number | undefined> = ref(undefined);
    const theses: Ref<number | undefined> = ref(undefined);

    const activeCourses: Ref<number | undefined> = ref(undefined);
    const activeCoursesWithThesis: Ref<number | undefined> = ref(undefined);

    onMounted(async () => {
      await wait(1000);
      exams.value = (await api.countExams()).count;
      theses.value = (await api.countTheses()).count;

      activeCourses.value = (await api.countCoursesWithExams()).count;
      activeCoursesWithThesis.value = (
        await api.countCoursesWithThesis()
      ).count;
    });

    return {
      tl,
      exams,
      theses,
      activeCourses,
      activeCoursesWithThesis,
    };
  },
};
</script>

<template lang="pug">
.my-4
  div
    .p-2(v-if="theses && exams")
      .text-xl.font-bold {{ tl.pages.home.uploaded_exams }}
      .text-lg {{ theses }} / {{ exams }} ({{ (theses / exams).mul(100).floor() }}%)
    .skeleton.p-2(v-else)
      .skeleton-lg.w-24
      .flex
        .skeleton-lg.w-24
        .text-lg.text-base-300 /
        .skeleton-lg.w-36
  .mt-2
    .p-2(v-if="activeCourses && activeCoursesWithThesis")
      .text-xl.font-bold {{ tl.pages.home.courses_with_thesis }}
      .text-lg {{ activeCoursesWithThesis }} / {{ activeCourses }} ({{ (activeCoursesWithThesis / activeCourses).mul(100).floor() }}%)
      .flex.items-center
        span.text-primary.pr-2.fa.fa-angles-right
        Link.text-primary(:to="{ name: 'CoursesWithoutThesis' }") {{ tl.pages.home.action_find_missing_exams }}
    .skeleton.p-2(v-else)
      .skeleton-lg.w-48
      .flex
        .skeleton-lg.w-24
        .text-lg.text-base-300 /
        .skeleton-lg.w-24
      .skeleton-lg.w-72
</template>
