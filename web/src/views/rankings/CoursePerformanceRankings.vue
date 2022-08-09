<script lang="ts">
import Http from "../../plugins/http";
import { getYear, getMonth } from "date-fns";
import { computed, defineComponent, reactive, Ref, ref, watch } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { Exam } from "../../plugins/api/types";
import { storeToRefs } from "pinia";
import { useLocalization } from "../../plugins/localization";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "CoursePerformanceRankings",
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
    let courses: Ref<
      Array<
        Exam & {
          passrate: number;
          participants: number;
          course: { name_en: string; name_sv: string };
        }
      >
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
      tl,
      locale,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.gap-4
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
        :label="tl.terms.electivity"
      )
  .grid.grid-cols-2.gap-4
    .col-span-1
      .font-bold {{ tl.ui.min_participants }}
      input.h-10.p-2.rounded.w-full.bg-base-200(
        v-model="q.minParticipants",
        type="number",
        min="1"
      )
    .col-span-1
      .font-bold {{ tl.ui.max_participants }}
      input.h-10.p-2.rounded.w-full.bg-base-200(
        v-model="q.maxParticipants",
        type="number",
        min="1"
      )

  .col-span-1.flex.justify-between
    div
      span.font-bold {{ tl.ui.hint }}:&nbsp;
      span {{ tl.ui.sort_order_hint }}
    div {{ filteredCourses.length }} {{ tl.ui.results }}

  .flex.justify-center(v-if="loading")
    Spinner
  div(v-else)
    .row.text-center(v-if="filteredCourses.isEmpty()")
      div {{ tl.ui.no_results }}
    .overflow-x-scroll(v-else)
      table.tp-table.py-3
        thead
          tr
            th {{ tl.ui.course_code }}
            th.hidden(class="md:block") {{ tl.ui.name }}
            th.text-end.cursor-pointer(@click="setSortingKey('passrate')")
              span.pr-2(v-if="sortingKey == 'passrate'")
                SortingOrderIcon(:descending="orderDescending")
              span {{ tl.ui.passrate }}
            th.text-end.cursor-pointer(@click="setSortingKey('participants')")
              span.pr-2(v-if="sortingKey == 'participants'")
                SortingOrderIcon(:descending="orderDescending")
              span {{ tl.ui.participants }}
        tbody
          tr(
            v-for="course in filteredCourses",
            :key="course.course_code + course.date"
          )
            td
              Link.font-bold.text-primary(
                :to="{ name: 'Course/ExamStatistics', params: { code: course.course_code } }"
              ) {{ course.course_code }}
            td.hidden(class="md:block") {{ locale === "en" ? course.course.name_en : course.course.name_sv }}
            td.text-end {{ course.passrate }}%
            td.text-end {{ course.participants }}
</template>
