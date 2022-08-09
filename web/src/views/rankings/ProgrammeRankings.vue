<script lang="ts">
import Http from "../../plugins/http";
import { getYear, getMonth } from "date-fns";
import { computed, defineComponent, reactive, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAPI } from "../../plugins/api";
import { storeToRefs } from "pinia";
import { useLocalization } from "../../plugins/localization";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "ProgrammeRankings",
  async setup() {
    const api = useAPI();
    const route = useRoute();

    const l = useLocalization();
    const { tl, locale } = storeToRefs(l);
    document.title = l.title(tl.value.pages.programme_impressions.title);

    const category = ref("All");
    const categories = ref([
      {
        label: tl.value.terms.master_of_engineering,
        prefix: "TK",
        show: true,
      },
      { label: tl.value.terms.engineering_bachelor, prefix: "TI", show: true },
      { label: tl.value.terms.mastersprogramme, prefix: "MP", show: true },
    ]);

    const availableYears = new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date()))),
      );

    const showMiscCategories = ref(true);

    const orderDescending = ref(true);
    const sortingKey = ref(String(route.query.sort ?? "total_impression_mean"));

    const query = reactive({
      academicYear: String(availableYears.first()),
    });

    const programmes: Ref<Array<any>> = ref([]);

    const loadCourses = async () => {
      programmes.value = (
        await api.fetchProgrammeImpressionRankings(query)
      ).map((p) => {
        // const failrate = p.failed
        //   .div(p.total_grades)
        //   .mul(100)
        //   .roundTo(2)
        //   .toString();
        const answer_frequency = p.answer_frequency.roundTo(2).toString();
        return { ...p, answer_frequency };
      });
    };

    watch(query, () => loadCourses());

    const entries = computed(() =>
      programmes.value
        .filter(
          ({ code }) =>
            !categories.value.some(
              ({ prefix, show }) => !show && code.startsWith(prefix),
            ),
        )
        .filter(({ code }) => {
          if (
            categories.value.every(({ prefix }) => !code.startsWith(prefix))
          ) {
            return showMiscCategories.value;
          }
          return true;
        })
        .sortBy((a: any, b: any) =>
          orderDescending.value
            ? a[sortingKey.value] - b[sortingKey.value]
            : b[sortingKey.value] - a[sortingKey.value],
        ),
    );

    const setSortingKey = (key: string) => {
      if (key != sortingKey.value) {
        orderDescending.value = false;
        sortingKey.value = key;
      } else {
        orderDescending.value = !orderDescending.value;
      }
    };

    await loadCourses();

    return {
      category,
      categories,
      query,
      availableYears,
      showMiscCategories,

      orderDescending,
      sortingKey,
      setSortingKey,
      entries,
      tl,
      locale,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.justify-center.gap-4
  .grid.grid-cols-1.gap-4
    .col-span-1
      Select(
        v-model="query.academicYear",
        :values="availableYears",
        :label="tl.terms.academic_year",
        :clearable="false"
      )
    .col-span-1.grid.grid-cols-1.gap-x-32.gap-y-4(class="md:grid-cols-2")
      .flex.justify-between.items-center(v-for="category in categories")
        .font-bold {{ category.label }}
        RetroSwitch(v-model="category.show")
      .flex.justify-between
        .font-bold {{ tl.ui.other }}
        RetroSwitch(v-model="showMiscCategories")
      //- sp-select(
      //-   v-model="category",
      //-   :values="categories",
      //-   labelKey="key",
      //-   label="Category",
      //-   @input="filter"
      //- )
      //-   template(v-slot:default="{ item }")
      //-     span {{ item.label }}
  .flex.justify-between.pb-2
    div
      span.font-bold {{ tl.ui.hint }}:&nbsp;
      span {{ tl.ui.sort_order_hint }}
    div {{ entries.length }} {{ tl.ui.results }}
  table.tp-table
    thead.user-select-none
      th
        span {{ tl.ui.course_code }}
      th.text-end.cursor-pointer(
        @click="setSortingKey('total_impression_mean')"
      )
        span.pr-2(v-if="sortingKey == 'total_impression_mean'")
          SortingOrderIcon(:descending="orderDescending")
        span {{ tl.ui.overall_impression }}
      //- .col-3.text-end.cursor-pointer(@click="setSortingKey('failrate')") 
      //-   span.pr-2(v-if="sortingKey == 'failrate'")
      //-     SortingOrderIcon(:descending="orderDescending")
      //-   span Failrate
      //- .col-2.text-end.cursor-pointer(@click="setSortingKey('courses')") 
      //-   span.pr-2(v-if="sortingKey == 'courses'")
      //-     SortingOrderIcon(:descending="orderDescending")
      //-   span Courses owned
      th.text-end.cursor-pointer(@click="setSortingKey('answer_frequency')")
        span.pr-2(v-if="sortingKey == 'answer_frequency'")
          SortingOrderIcon(:descending="orderDescending")
        span {{ tl.ui.answer_frequency }}
    tbody
      tr(v-for="programme in entries", :key="programme.code")
        //- .col-1.text-primary
        //-   Link(
        //-     :to="{ name: 'programme/exam-statistics', params: { code: programme.code } }"
        //-   ) {{ programme.code }}
        td.fw-bold {{ programme.code }}
        td.text-end {{ programme.total_impression_mean.roundTo(2) }}
        //- .col-3.flex.justify-content-end
        //-   .text-muted.pr-2 ({{ programme.failed }} / {{ programme.total_grades }})
        //-   div {{ programme.failrate }}%
        //- .col-2.text-end {{ programme.courses }}
        td.text-end
          //- .text-muted.pr-2 ({{ programme.responses }} / {{ programme.respondents }})
          div {{ programme.answer_frequency }}%
</template>
