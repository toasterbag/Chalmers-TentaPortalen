<template lang="pug">
div(v-if="this.ready")
  .row.p-md-5
    .col-md-6
      sp-select(
        v-model="academic_year",
        :values="year_span",
        label="Academic year",
        @input="updateQuery"
      )
  .row.justify-content-center.tenta-table.p-md-5
    .col-12
      .row.header.align-items-center
        .col-6.clickable(@click="sort_by('course_code')") Code
          span(v-if="sort_key == 'course_code'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('total_impression_mean')") Overall impression
          span.ps-2(v-if="sort_key == 'total_impression_mean'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('respondents')") Respondents
          span.ps-2(v-if="sort_key == 'respondents'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)
        .col-2.text-end.clickable(@click="sort_by('answer_frequency')") Answer frequency
          span.ps-2(v-if="sort_key == 'answer_frequency'")
            i.fa.fa-chevron-down(v-if="order_desc")
            i.fa.fa-chevron-up(v-else)

      .row(v-for="(programme, index) in sorted_programmes", :key="index")
        .col-6.text-primary
          router-link(
            :to="{ name: 'programme', params: { code: programme.code } }"
          ) {{ programme.code }}
        .col-2.text-end {{ programme.total_impression_mean.roundTo(2) }}
        .col-2.text-end {{ programme.code }}
        .col-2.text-end {{ programme.code }}
</template>

<script>
import Http from "../plugins/http";
import { getYear, getMonth } from "date-fns";

const date_to_academic_year = (date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default {
  name: "programme-search",
  data: () => ({
    ready: false,
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
    this.loadData();
  },
  methods: {
    async updateQuery() {
      this.$router
        .push({
          name: "programme-search",
          query: {
            programme: this.programme,
            academic_year: this.academic_year,
          },
        })
        .catch(() => {});
    },
    async loadData() {
      const query = {
        academic_year: this.academic_year,
      };
      const res = await Http.get(`programmes/search`, {
        query,
      });
      this.programmes = res;
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

      let programmes = this.programmes.sort(
        (a, b) => a[this.sort_key] > b[this.sort_key]
      );
      programmes = this.order_desc ? programmes.reverse() : programmes;
      this.sorted_programmes = programmes;
      this.$forceUpdate();
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
  },
};
</script>

<style lang="scss" scoped></style>
