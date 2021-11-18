<template lang="pug">
.mx-5(v-if="this.ready")
  .row
    //- .col-md-2
    //-   label.form-label Minimum responses
    //-   input.form-control(
    //-     v-model="min_responses",
    //-     @input="updateQuery",
    //-     type="number"
    //-   )
    //- .col-md-2
    //-   label.form-label Maximum responses
    //-   input.form-control(
    //-     v-model="max_responses",
    //-     @input="updateQuery",
    //-     type="number"
    //-   )
    .col-md-10
    //- .col-md-2
    //-   sp-select(
    //-     v-model="academic_year",
    //-     :values="year_span",
    //-     label="Academic year",
    //-     @input="updateQuery"
    //-   )
  .row.justify-content-center.tenta-table
    .text-end.mb-2 {{ programmes.length }} results
    .col-12
      .row.header.align-items-center
        .col-2.clickable(@click="sort_by('course_code')") Code
          span(v-if="sort_key == 'course_code'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('total_impression_mean')") Overall impression (mean)
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

      .row(
        v-for="(programme, index) in sorted_programmes",
        :key="programme.code"
      )
        .col-2.text-primary
          router-link(
            :to="{ name: 'programme', params: { code: programme.code } }"
          ) {{ programme.code }}
        .col-2.text-end {{ programme.total_impression_mean.roundTo(2) }}
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

    academic_year: "",
    year_span: new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date())))
      ),
    sorted_programmes: [],
  }),
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
      this.sort = this.programmes = await Http.get(`programmes/search`, {
        query,
      });
      this.programmes.forEach((p) => {
        p.failrate = p.failed
          .div(p.total_grades)
          .mul(100)
          .roundTo(2)
          .toString();
        p.answer_frequency = p.answer_frequency.roundTo(2).toString();
      });
      this.sort_by(this.sort_key);
      this.ready = true;
    },
    sort_by(key) {
      if (this.sort_key == key) {
        this.order_desc = !this.order_desc;
      } else {
        this.order_desc = false;
      }
      this.sort_key = key;

      let programmes = this.programmes
        .sortBy((x) => x[key])
        .order(!this.order_desc);
      this.sorted_programmes = programmes;
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
  .row:nth-child(n + 2) {
    .col-2 {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
input {
  width: 100%;
}
</style>
