<template lang="pug">
.flex.flex-col.justify-center.gap-4
  .grid.grid-cols-1.gap-4(class="md:grid-cols-3")
    .col-span-1
      Select(
        v-model="query.academicYear",
        :values="availableYears",
        label="Academic year",
        :clearable="false"
      )
    .col-span-1
      Combobox(
        v-model="query.programme",
        :suggestions="programmePlanSuggestions",
        label="Programme plan",
        @autocomplete="autocompleteProgrammePlan"
      )
    .col-span-1
      Combobox(
        v-model="query.department",
        :suggestions="departmentSuggestions",
        displayKey="name_en",
        label="Department",
        @autocomplete="autocompleteDepartment"
      )

  table.tp-table
    thead.user-select-none
      th Code
      th Name
    tbody
      tr(v-for="course in courses", :key="course.course_code")
        td.fw-bold
          Link.text-primary(
            :to="{ name: 'Course/Materials', params: { code: course.course_code } }"
          ) {{ course.course_code }}
        td {{ course.name_en }}
</template>

<script lang="ts">
import Http from "../../plugins/http";
import { getYear, getMonth } from "date-fns";
import { computed, defineComponent, reactive, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { Course, Department } from "../../plugins/api/types";
import { storeToRefs } from "pinia";
import { useLocalization } from "@plugins/localization";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "CoursesWithoutThesis",
  async setup() {
    const api = useAPI();

    const l = useLocalization();
    const { tl } = storeToRefs(l);
    document.title = l.title(tl.value.pages.courses_without_thesis.title);

    const availableYears = new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date()))),
      );

    const query = reactive({
      academicYear: String(availableYears.first()),
      programme: undefined as string | undefined,
      department: undefined as Department | undefined,
    });

    const courses: Ref<Array<Course>> = ref([]);
    const loadCourses = async () => {
      courses.value = await api.getCoursesWithoutThesis({
        programme: query.programme,
        year: query.academicYear,
        departmentId: query.department?.id,
      });
    };

    watch(query, () => loadCourses());

    await loadCourses();

    const programmePlanSuggestions: Ref<Array<string>> = ref([]);
    const autocompleteProgrammePlan = async (term: string) => {
      const programmes = await api.searchProgramme(term);
      programmePlanSuggestions.value = programmes.take(8).map((p) => p.code);
    };

    const departmentSuggestions: Ref<Array<Department>> = ref([]);
    const autocompleteDepartment = async (term: string) => {
      const departments = await api.searchDepartment(term);
      departmentSuggestions.value = departments.take(8);
    };

    return {
      courses,
      query,
      availableYears,
      programmePlanSuggestions,
      autocompleteProgrammePlan,
      departmentSuggestions,
      autocompleteDepartment,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../variables.scss";
</style>
