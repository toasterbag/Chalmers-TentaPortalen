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
        .col-6.col-lg-3
          Combobox(
            v-model="q.programmePlan",
            :suggestions="programmePlanSuggestions",
            label="Programme plan",
            @autocomplete="autocompleteProgrammePlan"
          )
        .col-6.col-lg-3(v-if="q.programmePlan.length")
          Select(
            v-model="q.electivity",
            :values="electiviyCategories",
            label="Electivity",
            :clearable="false"
          )

        //- .col-4(v-if="programmePlan !== ''")
        //-   sp-select(
        //-     v-model="grade",
        //-     :values="grade",
        //-     label="Electivity",
        //-     @input="updateQuery"
        //-   )
      .row
        .col-6.col-lg-3.pb-2
          label.form-label Minimum responses
          input.form-control(v-model="q.minResponses", type="number", min="1")
        .col-6.col-lg-3.pb-2
          label.form-label Maximum responses
          input.form-control(v-model="q.maxResponses", type="number", min="1")
        .col-6.col-lg-3
          Select(
            v-model="q.startPeriod",
            :values="periods",
            label="Start period"
          )
        .col-6.col-lg-3
          Select(v-model="q.endPeriod", :values="periods", label="End Period")

    .row.justify-content-center.tenta-table
      .d-flex.justify-content-between.pb-2
        div Tip: You can click on the column titles to change sort order
        div {{ courses.length }} results
      .col-12
        .row.header.align-items-center.user-select-none
          .col-3 Code
          .col-2.text-end.clickable(
            @click="setSortingKey('total_impression_mean')"
          )
            span.pe-2(v-if="sortingKey == 'total_impression_mean'")
              SortingOrderIcon(:descending="orderDescending")
            span Overall impression
          .col-2.text-end.clickable(@click="setSortingKey('respondents')")
            span.pe-2(v-if="sortingKey == 'respondents'")
              SortingOrderIcon(:descending="orderDescending")
            span Respondents
          .col-2.text-end.clickable(@click="setSortingKey('responses')")
            span.pe-2(v-if="sortingKey == 'responses'")
              SortingOrderIcon(:descending="orderDescending")
            span Responses
          .col-3.text-end.clickable(@click="setSortingKey('answer_frequency')")
            span.pe-2(v-if="sortingKey == 'answer_frequency'")
              SortingOrderIcon(:descending="orderDescending")
            span Answer frequency

        .d-flex.justify-content-center(v-if="loading")
          Spinner
        div(v-else)
          .row.text-center(v-if="courses.isEmpty()")
            div No results
          .row(
            v-else,
            v-for="course in courses",
            :key="course.course_code + course.start_period + course.end_period"
          )
            .col-3.fw-bold.text-primary
              router-link(
                :to="{ name: 'Course/ExamStatistics', params: { code: course.course_code } }"
              ) {{ course.course_code }}
            .col-2.text-end {{ course.total_impression_mean.roundTo(2) }}
            .col-2.text-end {{ course.respondents }}
            .col-2.text-end {{ course.responses }}
            .col-3.text-end {{ course.answer_frequency.roundTo(2) }}%
</template>

<script lang="ts">
import Http from "../../plugins/http";
import { getYear, getMonth } from "date-fns";
import { defineComponent, reactive, Ref, ref, watch } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { Survey } from "../../plugins/api/types";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "CourseImpressionRankings",
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
      minResponses: Number(validateQueryParam(route.query.min_responses) ?? 20),
      maxResponses: Number(
        validateQueryParam(route.query.max_responses) ?? 500,
      ),
      startPeriod: undefined,
      endPeriod: undefined,
    });

    const sortingKey = ref(
      String(route.query.sorting_key ?? "total_impression_mean"),
    );
    const orderDescending = ref(
      Boolean(route.query.order_descending ?? "false"),
    );

    let loading = ref(false);
    let timer = setTimeout(() => {}, 0);
    let courses: Ref<Array<Survey>> = ref([]);

    const setSortingKey = (key: string) => {
      if (key != sortingKey.value) {
        orderDescending.value = false;
        sortingKey.value = key;
      } else {
        orderDescending.value = !orderDescending.value;
      }
    };

    const sortCourses = () => {
      courses.value = courses.value.sortBy((a: any, b: any) => {
        const key = sortingKey.value;
        if (key in a && key in b) {
          if (orderDescending.value) {
            return a[key] - b[key];
          }
          return b[key] - a[key];
        }
        return 0;
      });
    };

    const loadCourses = async () => {
      courses.value = await api.fetchCourseImpressionRankings(q);
      sortCourses();
      loading.value = false;
    };

    watch(q, () => {
      loading.value = true;
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
      ownerSuggestions.value = programmes.take(8).map((p) => p.code);
    };
    const autocompleteProgrammePlan = async (term: string) => {
      const programmes = await api.searchProgramme(term);
      programmePlanSuggestions.value = programmes.take(8).map((p) => p.code);
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
      courses,
      periods: [1, 2, 3, 4],
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
