<template lang="pug">
.row.d-flex.justify-content-center
  .col-10.col-lg-8
    .row.my-4
      .row
        .col-12.col-md-6
          Combobox(
            v-model="q.owner",
            :suggestions="ownerSuggestions",
            label="Owner",
            @autocomplete="autocompleteOwner"
          )
        .col-12.col-md-6
          Select(
            v-model="q.academicYear",
            :values="availableYears",
            label="Academic year",
            :clearable="false"
          )
      .row
        .col-12.col-md-6
          Combobox(
            v-model="q.programmePlan",
            :suggestions="programmePlanSuggestions",
            label="Programme plan",
            @autocomplete="autocompleteProgrammePlan"
          )
        .col-12.col-md-6(v-if="q.programmePlan.length")
          Select(
            v-model="q.electivity",
            :values="electiviyCategories",
            label="Electivity"
          )
      .row
        .col-12.col-md-6.pb-2
          label.form-label Minimum participants
          input.form-control(
            v-model="q.minParticipants",
            type="number",
            min="1"
          )
        .col-12.col-md-6.pb-2
          label.form-label Maximum participants
          input.form-control(
            v-model="q.maxParticipants",
            type="number",
            min="1"
          )

    .row.justify-content-center.tenta-table
      .d-flex.justify-content-between.pb-2
        div Tip: You can click on the column titles to change sort order
        div {{ filteredCourses.length }} results
      .col-12
        .row.header.align-items-center.user-select-none
          .col-4 Code
          .col-4.text-end.clickable(@click="setSortingKey('passrate')")
            span.pe-2(v-if="sortingKey == 'passrate'")
              SortingOrderIcon(:descending="orderDescending")
            span Passrate
          .col-4.text-end.clickable(@click="setSortingKey('participants')")
            span.pe-2(v-if="sortingKey == 'participants'")
              SortingOrderIcon(:descending="orderDescending")
            span Participants

        .d-flex.justify-content-center(v-if="loading")
          Spinner
        div(v-else)
          .row.text-center(v-if="filteredCourses.isEmpty()")
            div No results
          .row(
            v-else,
            v-for="course in filteredCourses",
            :key="course.course_code + course.date"
          )
            .col-4.fw-bold
              router-link(
                :to="{ name: 'Course/ExamStatistics', params: { code: course.course_code } }"
              ) {{ course.course_code }}
            .col-4.text-end {{ course.passrate }}%
            .col-4.text-end {{ course.participants }}
</template>

<script lang="ts">
import Http from "../../plugins/http";
import { getYear, getMonth } from "date-fns";
import { computed, defineComponent, reactive, Ref, ref, watch } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { Exam } from "../../plugins/api/types";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "CoursePerformanceRankings",
  async setup() {
    const api = useAPI();
    const route = useRoute();

    const availableYears = new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date()))),
      );

    const electiviyCategories = [
      "All",
      "Compulsory",
      "ElectiveCompulsory",
      "Elective",
    ];

    const validateQueryParam = (
      p: LocationQueryValue | LocationQueryValue[],
    ): LocationQueryValue => (!Array.isArray(p) ? p : null);

    const q = reactive({
      academicYear:
        validateQueryParam(route.query.academic_year) ?? availableYears[1],
      owner: validateQueryParam(route.query.owner) ?? "",
      programmePlan: validateQueryParam(route.query.programme_plan) ?? "",
      electivity: validateQueryParam(route.query.electivity) ?? "All",
      minParticipants: Number(
        validateQueryParam(route.query.min_participants) ?? 0,
      ),
      maxParticipants: Number(
        validateQueryParam(route.query.max_participants) ?? 500,
      ),
    });

    const sortingKey = ref(String(route.query.sorting_key ?? "passrate"));
    const orderDescending = ref(
      Boolean(route.query.order_descending ?? "false"),
    );

    let loading = ref(false);
    let timer = setTimeout(() => {}, 0);
    let courses: Ref<Array<
      Exam & { passrate: number; participants: number }
    >> = ref([]);

    const setSortingKey = (key: string) => {
      if (key != sortingKey.value) {
        orderDescending.value = false;
        sortingKey.value = key;
      } else {
        orderDescending.value = !orderDescending.value;
      }
    };

    const sortCourses = () => {
      loading.value = true;

      setTimeout(() => {
        courses.value = courses.value
          .filter(
            (e) =>
              e.participants >= q.minParticipants &&
              e.participants <= q.maxParticipants,
          )
          .sortBy((a: any, b: any) => {
            if (orderDescending.value) {
              return a[sortingKey.value] - b[sortingKey.value];
            } else {
              return b[sortingKey.value] - a[sortingKey.value];
            }
          });

        loading.value = false;
      }, 100);
    };

    const loadCourses = async () => {
      loading.value = true;

      courses.value = (await api.fetchCoursePerformanceRankings(q)).map((e) => {
        const passed = e.three + e.four + e.five;
        const total = passed + e.failed;
        const passrate = passed.div(total).mul(100).roundTo(2);
        return Object.assign(e, { passrate, participants: total });
      });

      sortCourses();
    };

    const filteredCourses = computed(() => courses.value);

    watch(q, () => {
      clearTimeout(timer);
      timer = setTimeout(() => loadCourses(), 500);
    });

    watch(sortingKey, () => {
      sortCourses();
    });

    watch(orderDescending, () => {
      sortCourses();
    });

    const ownerSuggestions: Ref<Array<string>> = ref([]);
    const programmePlanSuggestions: Ref<Array<string>> = ref([]);

    const autocompleteOwner = async (term: string) => {
      const programmes = await api.searchProgramme(term);
      ownerSuggestions.value = programmes.map((p) => p.code);
    };
    const autocompleteProgrammePlan = async (term: string) => {
      const programmes = await api.searchProgramme(term);
      programmePlanSuggestions.value = programmes.map((p) => p.code);
    };

    await loadCourses();

    return {
      availableYears,
      electiviyCategories,
      ownerSuggestions,
      programmePlanSuggestions,
      autocompleteOwner,
      autocompleteProgrammePlan,

      setSortingKey,
      sortingKey,
      orderDescending,

      loading,
      filteredCourses,
      q,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../variables.scss";

@include below(sm) {
  .tenta-table {
    position: relative;
    overflow-x: auto;
    & > * {
      position: relative;
      left: 200px;
      min-width: 700px;
    }
  }
}
</style>
