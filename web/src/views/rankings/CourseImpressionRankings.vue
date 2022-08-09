<script lang="ts">
import Http from "../../plugins/http";
import { getYear, getMonth } from "date-fns";
import { defineComponent, reactive, Ref, ref, watch } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { Survey } from "../../plugins/api/types";
import { storeToRefs } from "pinia";
import { useLocalization } from "../../plugins/localization";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "CourseImpressionRankings",
  async setup() {
    const api = useAPI();
    const route = useRoute();

    const l = useLocalization();
    const { tl, locale } = storeToRefs(l);
    document.title = l.title(tl.value.pages.course_impressions.title);

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
    let courses: Ref<
      Array<Survey & { course: { name_en: string; name_sv: string } }>
    > = ref([]);

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
      tl,
      locale,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.gap-4
  .my-4
    .grid.grid-cols-2.gap-4
      .col-span-1
        Combobox(
          v-model="q.owner",
          :suggestions="ownerSuggestions",
          :label="tl.terms.owner",
          @autocomplete="autocompleteOwner"
        )
      .col-span-1
        Select(
          v-model="q.academicYear",
          :values="availableYears",
          :label="tl.terms.academic_year",
          :clearable="false"
        )
      .col-span-1
        Combobox(
          v-model="q.programmePlan",
          :suggestions="programmePlanSuggestions",
          :label="tl.terms.programme_plan",
          @autocomplete="autocompleteProgrammePlan"
        )
      .col-span-1(v-if="q.programmePlan.length")
        Select(
          v-model="q.electivity",
          :values="electiviyCategories",
          :label="tl.terms.electivity",
          :clearable="false"
        )

      //- .col-4(v-if="programmePlan !== ''")
      //-   sp-select(
      //-     v-model="grade",
      //-     :values="grade",
      //-     label="Electivity",
      //-     @input="updateQuery"
      //-   )
    .grid.grid-cols-2.gap-4
      .col-span-1
        .font-bold {{ tl.ui.minimum_responses }}
        input.h-10.p-2.rounded.w-full.bg-base-200(
          v-model="q.minResponses",
          type="number",
          min="1"
        )
      .col-span-1
        .font-bold {{ tl.ui.maximum_responses }}
        input.h-10.p-2.rounded.w-full.bg-base-200(
          v-model="q.maxResponses",
          type="number",
          min="1"
        )
      .col-span-1
        Select(
          v-model="q.startPeriod",
          :values="periods",
          :label="tl.ui.start_period"
        )
      .col-span-1
        Select(
          v-model="q.endPeriod",
          :values="periods",
          :label="tl.ui.end_period"
        )

  .flex.justify-between.pb-2
    div 
      span.font-bold {{ tl.ui.hint }}:&nbsp;
      span {{ tl.ui.sort_order_hint }}
    div {{ courses.length }} {{ tl.ui.results }}
  .flex.justify-center(v-if="loading")
    Spinner
  div(v-else)
    .row.text-center(v-if="courses.isEmpty()")
      div {{ tl.ui.no_results }}
    .overflow-x-scroll
      table.tp-table.py-3
        thead
          tr
            th {{ tl.ui.course_code }}
            th.hidden(class="md:block") {{ tl.ui.name }}
            th.text-end.cursor-pointer(
              @click="setSortingKey('total_impression_mean')"
            )
              span.pr-2(v-if="sortingKey == 'total_impression_mean'")
                SortingOrderIcon(:descending="orderDescending")
              span {{ tl.ui.overall_impression }}
            th.text-end.cursor-pointer(@click="setSortingKey('respondents')")
              span.pr-2(v-if="sortingKey == 'respondents'")
                SortingOrderIcon(:descending="orderDescending")
              span {{ tl.ui.respondents }}
            th.text-end.cursor-pointer(@click="setSortingKey('responses')")
              span.pr-2(v-if="sortingKey == 'responses'")
                SortingOrderIcon(:descending="orderDescending")
              span {{ tl.ui.responses }}
            th.text-end.cursor-pointer(
              @click="setSortingKey('answer_frequency')"
            )
              span.pr-2(v-if="sortingKey == 'answer_frequency'")
                SortingOrderIcon(:descending="orderDescending")
              span {{ tl.ui.answer_frequency }}
        tbody
          tr(
            v-for="course in courses",
            :key="course.course_code + course.start_period + course.end_period"
          )
            td
              Link.fw-bold.text-primary(
                :to="{ name: 'Course/ExamStatistics', params: { code: course.course_code } }"
              ) {{ course.course_code }}
            td.hidden(class="md:block") {{ locale === "en" ? course.course.name_en : course.course.name_sv }}
            td.text-end {{ course.total_impression_mean.roundTo(2) }}
            td.text-end {{ course.respondents }}
            td.text-end {{ course.responses }}
            td.text-end {{ course.answer_frequency.roundTo(2) }}%
</template>
