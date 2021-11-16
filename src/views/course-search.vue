<template lang="pug">
.mx-5(v-if="this.ready")
  .row.mt-4
    .col-md-5
      sp-combobox(
        v-model="programme",
        :suggestions="programme_suggestions",
        label="Programme",
        @update:search-input="update_programme_suggestions",
        @blur="programme_suggestions = []",
        @input="updateQuery"
      )
    .col-md-5
      sp-combobox(
        v-model="department",
        :suggestions="department_suggestions",
        label="Department",
        @update:search-input="update_department_suggestions",
        @blur="department_suggestions = []",
        @input="updateQuery",
        item-key="name_en"
      )
    .col-md-2
      sp-select(
        v-model="academic_year",
        :values="year_span",
        label="Academic year",
        @input="updateQuery"
      )
  .row
    .col-md-2
      label.form-label Minimum responses
      input.form-control(
        v-model="min_responses",
        @input="updateQuery",
        type="number"
      )
    .col-md-2.mx-1
      label.form-label Maximum responses
      input.form-control(
        v-model="max_responses",
        @input="updateQuery",
        type="number"
      )
  .row.justify-content-center.tenta-table
    .text-end.mb-2 {{ list.length }} results
    .col-12
      .row.header.align-items-center
        .col-2.clickable(@click="sort_by('course_code')") Code
          span(v-if="sort_key == 'course_code'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-3.text-end.clickable(@click="sort_by('total_impression_mean')") Overall impression (mean)
          span.ps-2(v-if="sort_key == 'total_impression_mean'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('respondents')") Respondents
          span.ps-2(v-if="sort_key == 'respondents'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('responses')") Responses
          span.ps-2(v-if="sort_key == 'responses'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-3.text-end.clickable(@click="sort_by('answer_frequency')") Answer frequency
          span.ps-2(v-if="sort_key == 'answer_frequency'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)

      .row.text-center(v-if="sorted_courses.isEmpty()")
        div No results

      .row(
        v-for="(course, index) in sorted_courses",
        :key="course.course_code + course.start_period + course.end_period"
      )
        .col-2.text-primary
          router-link(
            :to="{ name: 'course/exam-statistics', params: { code: course.course_code } }"
          ) {{ course.course_code }}
        .col-3.text-end {{ course.total_impression_mean.roundTo(2) }}
        .col-2.text-end {{ course.respondents }}
        .col-2.text-end {{ course.responses }}
        .col-3.text-end {{ course.answer_frequency.roundTo(2) }}%
</template>

<script>
import Http from "../plugins/http";
import { getYear, getMonth } from "date-fns";

const date_to_academic_year = (date) =>
  getMonth(date) > 7
    ? `${getYear(date) - 1}/${getYear(date) + 1}`
    : `${getYear(date) - 2}/${getYear(date)}`;

export default {
  name: "search-courses",
  data: () => ({
    ready: false,
    programme: "",
    programme_suggestions: [],
    department: "",
    department_suggestions: [],
    min_responses: "",
    max_responses: "",
    list: [],
    sort_key: "total_impression_mean",
    order_desc: false,

    academic_year: "",
    year_span: new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date())))
      ),
    sorted_courses: [],
  }),
  watch: {
    $route() {
      this.loadData();
    },
  },
  created() {
    this.academic_year =
      this.$route.query.academic_year ?? date_to_academic_year(new Date());
    this.programme = this.$route.query.programme ?? "";
    this.department = this.$route.query.department ?? "";
    this.min_responses = this.$route.query.min_responses ?? "";
    this.max_responses = this.$route.query.max_responses ?? "";
    this.loadData();
  },
  methods: {
    async updateQuery() {
      const query = { academic_year: this.academic_year };
      if (this.programme) {
        query.programme = this.programme;
      }

      if (this.department[0] && this.department[0].id) {
        query.department = this.department[0].id;
      }

      if (this.min_responses) {
        query.min_responses = this.min_responses;
      }
      if (this.max_responses) {
        query.max_responses = this.max_responses;
      }

      this.$router
        .push({
          name: "course-search",
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
      if (this.$route.query.programme) {
        query.programme = this.$route.query.programme;
      }
      if (this.$route.query.department) {
        query.department = this.$route.query.department;
      }
      if (this.$route.query.min_responses) {
        query.min_responses = this.$route.query.min_responses;
      }
      if (this.$route.query.max_responses) {
        query.max_responses = this.$route.query.max_responses;
      }

      const res = await Http.get(`courses/search`, { query });
      this.list = res;
      this.sort_by("total_impression_mean");
      this.ready = true;
    },
    sort_by(key) {
      if (this.sort_key == key) {
        this.order_desc = !this.order_desc;
      } else {
        this.order_desc = false;
      }
      this.sort_key = key;

      let courses = this.list.sortBy((x) => x[key]).order(!this.order_desc);
      this.sorted_courses = courses;
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
input {
  width: 100%;
}
</style>
