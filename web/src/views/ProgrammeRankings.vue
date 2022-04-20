<template lang="pug">
.row.justify-content-center
  .col-10.col-md-8
    .row.my-4
      .col-md-6
        .form-check(v-for="category in categories")
          input.form-check-input(
            :id="`checkbox-${category.label}`",
            type="checkbox",
            v-model="category.show"
          )
          label.form-check-label(:for="`checkbox-${category.label}`")
            | {{ category.label }}
        .form-check
          input#checkbox-misc.form-check-input(
            type="checkbox",
            v-model="showMiscCategories"
          )
          label.form-check-label(for="checkbox-misc")
            | Other
      .col-12.col-md-6
        Select(
          v-model="query.academicYear",
          :values="availableYears",
          label="Academic year",
        )
        //- sp-select(
        //-   v-model="category",
        //-   :values="categories",
        //-   labelKey="key",
        //-   label="Category",
        //-   @input="filter"
        //- )
        //-   template(v-slot:default="{ item }")
        //-     span {{ item.label }}
    .row.justify-content-center.tenta-table
      .d-flex.justify-content-between.pb-2
        div Tip: You can click on the column titles to change sort order!
        div {{ entries.length }} results
      .col-12
        .row.header.align-items-center.user-select-none
          .col-1
            span Code
          .col-3.text-end.clickable(@click="setSortingKey('total_impression_mean')")
            span.pe-2(v-if="sortingKey == 'total_impression_mean'")
              SortingOrderIcon(:descending="orderDescending")
            span Overall impression
          .col-3.text-end.clickable(@click="setSortingKey('failrate')") 
            span.pe-2(v-if="sortingKey == 'failrate'")
              SortingOrderIcon(:descending="orderDescending")
            span Failrate
          .col-2.text-end.clickable(@click="setSortingKey('courses')") 
            span.pe-2(v-if="sortingKey == 'courses'")
              SortingOrderIcon(:descending="orderDescending")
            span Courses owned
          .col-3.text-end.clickable(@click="setSortingKey('answer_frequency')")
            span.pe-2(v-if="sortingKey == 'answer_frequency'")
              SortingOrderIcon(:descending="orderDescending")
            span Answer frequency

        .row(v-for="programme in entries", :key="programme.code")
          //- .col-1.text-primary
          //-   router-link(
          //-     :to="{ name: 'programme/exam-statistics', params: { code: programme.code } }"
          //-   ) {{ programme.code }}
          .col-1.fw-bold {{ programme.code }}
          .col-3.text-end {{ programme.total_impression_mean.roundTo(2) }}
          .col-3.d-flex.justify-content-end
            .text-muted.pe-2 ({{ programme.failed }} / {{ programme.total_grades }})
            div {{ programme.failrate }}%
          .col-2.text-end {{ programme.courses }}
          .col-3.d-flex.justify-content-end
            .text-muted.pe-2 ({{ programme.responses }} / {{ programme.respondents }})
            div {{ programme.answer_frequency }}%
</template>

<script lang="ts">
import Http from "../plugins/http";
import { getYear, getMonth } from "date-fns";
import { computed, defineComponent, reactive, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAPI } from "../plugins/api";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "ProgrammeRankings",
  async setup() {
    const api = useAPI();
    const route = useRoute();

    const category = ref("All");
    const categories = ref([
      {
        label: "Master of Engineering (Civilingenjör)",
        prefix: "TK",
        show: true,
      },
      { label: "Engineering (Högskoleingenjör)", prefix: "TI", show: true },
      { label: "Masters programme", prefix: "MP", show: true },
    ]);

    const availableYears = new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date()))),
      );

    const showMiscCategories = ref(true);

    const orderDescending = ref(true);
    const sortingKey = ref(String(route.query.sort ?? "total_impression_mean"))

    const query = reactive({
      academicYear: String(availableYears.first()),
    });

    const programmes: Ref<Array<any>> = ref([]);

    const loadCourses = async () => {
      programmes.value = (await api.fetchProgrammeImpressionRankings(query)).map((p) => {
        const failrate = p.failed
          .div(p.total_grades)
          .mul(100)
          .roundTo(2)
          .toString();
        const answer_frequency = p.answer_frequency.roundTo(2).toString();
        return { ...p, failrate, answer_frequency };
      });
    }


    watch(query, () => loadCourses())

    const entries = computed(() =>
      programmes.value
        .filter(
          ({ code }) =>
            !categories.value.some(
              ({ prefix, show }) => !show && code.startsWith(prefix)
            )
        )
        .filter(({ code }) => {
          if (categories.value.every(({ prefix }) => !code.startsWith(prefix))) {
            return showMiscCategories.value;
          }
          return true;
        })
        .sortBy((a: any, b: any) =>
          orderDescending.value
            ? a[sortingKey.value] - b[sortingKey.value]
            : b[sortingKey.value] - a[sortingKey.value])

    );

    const setSortingKey = (key: string) => {
      if (key != sortingKey.value) {
        orderDescending.value = false;
        sortingKey.value = key;
      }
      else {
        orderDescending.value = !orderDescending.value;
      }
    }

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
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

// .tenta-table {
//   .row:nth-child(n + 1) {
//     &:hover {
//       .text-muted {
//         display: inline;
//       }
//     }
//     .text-muted {
//       display: none;
//     }
//     .col-2 {
//       // border-right: 1px solid rgba(0, 0, 0, 0.1);
//     }
//   }
// }

@include below(sm) {
  .tenta-table {
    position: relative;
    overflow-x: auto;
    & > * {
      position: relative;
      left: 150px;
      min-width: 600px;
    }

    .row:nth-child(n + 1) {
      &:hover {
        .text-muted {
          display: inline;
        }
      }
      .text-muted {
        display: none;
      }
      .col-2 {
        // border-right: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
