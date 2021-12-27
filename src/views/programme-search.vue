<template lang="pug">
div
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
        input#bars-percent.form-check-input(
          type="checkbox",
          v-model="show_misc_categories"
        )
        label.form-check-label(for="bars-percent")
          | Other
    .col-md-4
      //- sp-select(
      //-   v-model="category",
      //-   :values="categories",
      //-   labelKey="key",
      //-   label="Category",
      //-   @input="filter"
      //- )
      //-   template(v-slot:default="{ item }")
      //-     span {{ item.label }}
  .row.justify-content-center.tenta-table(v-if="this.ready")
    .d-flex.justify-content-between.mb-1
      div Tip: You can click on the headers to change sort order!
      div {{ entries.length }} results
    .col-12
      .row.header.align-items-center
        .col-1.clickable(@click="sort_by('course_code')") Code
          span(v-if="sort_key == 'course_code'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-3.text-end.clickable(@click="sort_by('total_impression_mean')") Overall impression (mean)
          span.ps-2(v-if="sort_key == 'total_impression_mean'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-3.text-end.clickable(@click="sort_by('failrate')") Failrate
          span.ps-2(v-if="sort_key == 'failrate'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('responses')") Courses owned
          span.ps-2(v-if="sort_key == 'responses'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-3.text-end.clickable(@click="sort_by('answer_frequency')") Answer frequency
          span.ps-2(v-if="sort_key == 'answer_frequency'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)

      .row(v-for="(programme, index) in entries", :key="programme.code")
        //- .col-1.text-primary
        //-   router-link(
        //-     :to="{ name: 'programme/exam-statistics', params: { code: programme.code } }"
        //-   ) {{ programme.code }}
        .col-1.text-primary {{ programme.code }}
        .col-3.text-end {{ programme.total_impression_mean.roundTo(2) }}
        .col-1
        .col-2.text-end.d-flex.justify-content-between
          .text-muted ({{ programme.failed }} / {{ programme.total_grades }})
          div {{ programme.failrate }}%
        .col-2.text-end {{ programme.courses }}
        .col-1
        .col-2.text-end.d-flex.justify-content-between
          .text-muted ({{ programme.responses }} / {{ programme.respondents }})
          div {{ programme.answer_frequency }}%
</template>

<script>
import Http from "../plugins/http";
import { getYear, getMonth } from "date-fns";

const date_to_academic_year = (date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default {
  name: "search-courses",
  data: () => ({
    ready: false,

    min_responses: "",
    max_responses: "",
    programmes: [],
    sort_key: "total_impression_mean",
    order_desc: false,

    category: "All",
    categories: [
      {
        label: "Master of Engineering (Civilingenjör)",
        prefix: "TK",
        show: true,
      },
      { label: "Engineering (Högskoleingenjör)", prefix: "TI", show: true },
      { label: "Masters programme", prefix: "MP", show: true },
    ],
    show_misc_categories: true,
    academic_year: "",
    year_span: new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date())))
      ),
    sorted_programmes: [],
  }),
  computed: {
    entries() {
      return Array.from(this.programmes)
        .filter(
          ({ code }) =>
            !this.categories.some(
              ({ prefix, show }) => !show && code.startsWith(prefix)
            )
        )
        .filter(({ code }) => {
          if (this.categories.every(({ prefix }) => !code.startsWith(prefix))) {
            return this.show_misc_categories;
          }
          return true;
        })
        .sortBy((x) => x[this.sort_key])
        .order(!this.order_desc);
    },
  },
  watch: {
    $route() {
      this.loadData();
    },
  },
  created() {
    this.academic_year =
      this.$route.query.academic_year ?? date_to_academic_year(new Date());
    this.sort_key = this.$route.query.sort ?? "total_impression_mean";
    this.order_desc = this.$route.query.order == "asc" ? false : true;

    this.loadData();
  },
  methods: {
    async updateQuery() {
      const query = {
        academic_year: this.academic_year,
        sort: this.sort_key,
        order: this.order_desc ? "desc" : "asc",
      };

      this.$router
        .replace({
          name: "programme-search",
          query,
        })
        .catch(() => {});
    },
    async loadData() {
      const query = {
        academic_year: this.academic_year,
        min_score: 0,
        max_score: 3,
        order: "asc",
      };
      const programmes = await Http.get(`programmes/search`, {
        query,
      });
      this.programmes = programmes.map((p) => {
        p.failrate = p.failed
          .div(p.total_grades)
          .mul(100)
          .roundTo(2)
          .toString();
        p.answer_frequency = p.answer_frequency.roundTo(2).toString();
        return p;
      });
      this.ready = true;
    },
    sort_by(key) {
      if (this.sort_key == key) {
        this.order_desc = !this.order_desc;
      } else {
        this.order_desc = false;
      }
      this.sort_key = key;
    },
    async update_programme_suggestions(term) {
      if (term.length == 0) {
        return;
      }

      if (term.length < 2) {
        this.programme_suggestions = [];
        return;
      }
      const res = await Http.get(`search/${term}`);
      this.programme_suggestions = res.programmes.take(8).map((e) => e.code);
      this.$forceUpdate();
    },
    async update_department_suggestions(term) {
      if (term.length == 0) {
        return;
      }

      if (term.length < 2) {
        this.department_suggestions = [];
        return;
      }
      const res = await Http.get(`search/${term}`);
      this.department_suggestions = res.departments.take(8);
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.tenta-table {
  .row:nth-child(n + 1) {
    .col-2 {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
