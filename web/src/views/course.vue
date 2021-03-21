<template lang="pug">
.container
  div(v-if="this.ready")
    .row.pa-3
      .col-8
        h3.capitalize [{{ code }}] {{ name }}
        div {{ owner }}
      .col-md-4
        //- div Examinator: {{ examiner }}
        div
          a(
            :href="`https://github.com/dtekcth/plugg/${code}`",
            target="_blank"
          ) 
            | Exams
            span.text-pink &nbsp BETA
        div
          a(
            :href="`https://github.com/dtekcth/plugg/${code}/surveys`",
            target="_blank"
          ) 
            | Course surveys
            span.text-pink &nbsp BETA
        div Avg. failrate: {{ avg_failrate }}%
        .form-check
          input#hide-reexams.form-check-input(
            type="checkbox",
            v-model="hide_reexams"
          )
          label.form-check-label(for="hide-reexams")
            | Dölj omtentor

    .row.justify-content-center
      .col-12
        exam-bar-graph(:exams="exams")
    .row.justify-content-center.tenta-table.p-md-5
      .col-12
        .row.header
          .col-2 Date
          .col-2 U
          .col-2 3
          .col-2 4
          .col-2 5
          .col-2 Students

        .row.align-middle(v-for="exam in exams", :key="exam.date")
          .col-2 {{ exam.date }}
          .col-2(:class="{ 'text-danger': exam.failedPercent > 50 }") {{ exam.failedPercent }}%
          .col-2 {{ exam.threePercent }}%
          .col-2 {{ exam.fourPercent }}%
          .col-2 {{ exam.fivePercent }}%
          .col-2.text-end {{ exam.total }}
</template>

<script>
import Http from "../plugins/http";
import { format } from "date-fns";

export default {
  name: "course",
  data: () => ({
    ready: false,
    hide_reexams: false,

    name: undefined,
    code: undefined,
    owner: undefined,
    exams: null,
    all_exams: [],
    without_reexams: [],
  }),
  computed: {
    avg_failrate() {
      return this.exams
        ?.map((e) => e.failed / e.total)
        .average()
        .mul(100)
        .round();
    },
  },
  watch: {
    $route() {
      this.loadCourse();
    },
    hide_reexams(value) {
      if (value) {
        this.exams = this.without_reexams;
        Http.log("Hide reexams");
      } else {
        this.exams = this.all_exams;
        Http.log("Show reexams");
      }
    },
  },
  created() {
    this.loadCourse();
  },
  methods: {
    async loadCourse() {
      this.hide_reexams = false;
      let res = await Http.get(`course/${this.$route.params.code}`);

      this.name = res.name;
      this.code = res.code;
      this.owner = res.owner;
      this.examiner = res.examiner;

      this.all_exams = res.exams
        .map((exam) => {
          exam.total = exam.failed + exam.three + exam.four + exam.five;
          exam.failedPercent = exam.failed.div(exam.total).mul(100).round();
          exam.threePercent = exam.three.div(exam.total).mul(100).round();
          exam.fourPercent = exam.four.div(exam.total).mul(100).round();
          exam.fivePercent = exam.five.div(exam.total).mul(100).round();
          exam.date = format(new Date(exam.date), "yyyy-MM-dd");
          return exam;
        })
        .sort((a, b) => a.date > b.date);

      // Filter out reexams
      const exams_by_year = {};
      for (let exam of this.all_exams) {
        const year = exam.date.substring(0, 4);
        if (!(year in exams_by_year)) {
          exams_by_year[year] = [];
        }
        exams_by_year[year].push(exam);
      }

      this.without_reexams = Object.values(exams_by_year).map((xs) =>
        xs.reduce((a, b) => (a.total > b.total ? a : b))
      );

      // If the main exam has not been held this year the algorithm will include
      // the reexam this year with the most participants
      // So if the last exam has an unreasonably low attendance we remove it
      if (
        this.without_reexams.last().total <
        this.without_reexams[this.without_reexams.length - 2].total * 0.6
      ) {
        this.without_reexams.splice(this.without_reexams.length - 1, 1);
      }
      this.exams = this.all_exams;
      this.ready = true;
      Http.log("course", this.code);
    },
  },
};
</script>

<style lang="scss" scoped></style>
