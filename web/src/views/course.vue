<template lang="pug">
.container
  div(v-if="this.ready")
    .row.pa-3
      .col-6
        h3.capitalize [{{ code }}] {{ name }}
        div {{ owner }}
      .col-md-2
        //- div Examinator: {{ examiner }}
        div
          a.feature--exam(
            :href="`https://github.com/dtekcth/plugg/tree/master/${code}`",
            target="_blank"
          ) 
            | Exams
            span.text-pink &nbsp BETA
        div
          a.feature--exam(
            :href="`https://github.com/dtekcth/plugg/tree/master/${code}/surveys`",
            target="_blank"
          ) 
            | Course surveys
            span.text-pink &nbsp BETA
        div Avg. failrate: {{ avg_failrate }}%
      .col-md-2
        .form-check
          input#hide-reexams.form-check-input(
            type="checkbox",
            v-model="hide_reexams"
          )
          label.form-check-label(for="hide-reexams")
            | Hide re-exam
        .form-check
          input#stack-bars.form-check-input(
            type="checkbox",
            v-model="stack_bars"
          )
          label.form-check-label(for="stack-bars")
            | Stack bars
        .form-check
          input#bars-percent.form-check-input(
            type="checkbox",
            :disabled="!stack_bars",
            v-model="bar_percent"
          )
          label.form-check-label(for="bars-percent")
            | Values as percent

    .row.justify-content-center
      .col-12
        exam-bar-graph(
          :exams="exams",
          :stacked="stack_bars",
          :percent-mode="bar_percent",
          :unit="bar_percent ? '%' : ''"
        )
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
          .col-2(:class="{ 'text-danger': exam.failedPercent > 50 }") {{ exam.percent.failed }}%
          .col-2 {{ exam.percent.three }}%
          .col-2 {{ exam.percent.four }}%
          .col-2 {{ exam.percent.five }}%
          .col-2.text-end {{ exam.total }}
</template>

<script>
import Http from "../plugins/http";
import { format } from "date-fns";

export default {
  name: "course",
  data: () => ({
    ready: false,
    hide_reexams: true,
    stack_bars: true,
    bar_percent: true,

    name: undefined,
    code: undefined,
    owner: undefined,
    all_exams: [],
    without_reexams: [],
  }),

  computed: {
    avg_failrate() {
      return this.exams
        ?.map((e) => e.percent.failed)
        .average()
        .round();
    },
    filtered_exams() {
      let exams = this.all_exams.map((exam) => {
        exam.total = exam.failed + exam.three + exam.four + exam.five;
        exam.percent = {};

        const [failed, three, four, five] = Math.roundToTarget(
          [exam.failed, exam.three, exam.four, exam.five]
            .map((e) => e.div(exam.total).mul(100))
            .inspect(console.log),
          100
        );

        exam.percent.failed = failed;
        exam.percent.three = three;
        exam.percent.four = four;
        exam.percent.five = five;
        return exam;
      });

      if (this.hide_reexams && exams.length > 3) {
        // Filter out reexams
        const exams_by_year = exams.groupBy((e) => e.date.substring(0, 4));

        exams = Object.values(exams_by_year).map((exams) =>
          exams.reduce((a, b) => (a.total > b.total ? a : b), { total: 0 }, [])
        );

        // If the main exam has not been held this year the algorithm will include
        // the reexam this year with the most participants
        // So if the last exam has an unreasonably low attendance we remove it
        if (exams.last().total < exams[exams.length - 2].total * 0.6) {
          exams.splice(exams.length - 1, 1);
        }
      }

      return exams;
    },

    exams() {
      let exams = this.filtered_exams;
      if (this.bar_percent) {
        exams = this.filtered_exams.map((e) => Object.assign({}, e, e.percent));
      }
      return exams;
    },
  },
  watch: {
    $route() {
      this.loadCourse();
    },
    stack_bars(val) {
      if (!val) {
        this.bar_percent = false;
      }
    },
  },
  created() {
    this.loadCourse();
  },
  methods: {
    async loadCourse() {
      let res = await Http.get(`course/${this.$route.params.code}`);

      this.name = res.name;
      this.code = res.code;
      this.owner = res.owner;
      this.examiner = res.examiner;

      this.all_exams = res.exams
        .map((exam) => {
          exam.date = format(new Date(exam.date), "yyyy-MM-dd");
          return exam;
        })
        .sort((a, b) => a.date > b.date);

      this.ready = true;
      Http.log("course", this.code);
    },
  },
};
</script>

<style lang="scss" scoped></style>
