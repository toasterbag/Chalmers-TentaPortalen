<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-between.py-md-0.py-3(v-if="all_exams.isEmpty()")
    .fs-2.text-center This course has no exams
  div(v-else)
    .row.justify-content-center.pt-2
      .col-12
        exam-bar-graph(
          :exams="exams.map((e) => e).reverse()",
          :stacked="stack_bars",
          :percent-mode="display_percent",
          :unit="display_percent ? '%' : ''"
        )
    .row.justify-content-between.py-2
      .col-md-2.ps-4
        div Avg. failrate: {{ avg_failrate }}%
      .col-md-10
        .d-flex.justify-content-end
          .form-check.pe-4(v-if="all_exams.length > 3")
            input#hide-reexams.form-check-input(
              type="checkbox",
              v-model="hide_reexams"
            )
            label.form-check-label(for="hide-reexams")
              | Hide re-exams
          .form-check(
            v-else,
            v-tooltip="{ placement: 'top', title: 'Can only hide re-exams when there are more than 3 exams'}"
          )
            input#hide-reexams.form-check-input(
              type="checkbox",
              disabled,
              value="false"
            )
            label.form-check-label(for="hide-reexams")
              | Hide re-exams
          .form-check.pe-4
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
              v-model="display_percent"
            )
            label.form-check-label(for="bars-percent")
              | Values as percent

    .tenta-table.p-md-5.py-3
      .row(v-if="has_low_participation")
        .col-12.text-accent Some exams have low participation ( n < 20 ) and may have rounding errors up to 1%.

      .row.header
        .col-3.col-md-2 Date
        .col-2.text-end U
        .col-2.text-end 3
        .col-2.text-end 4
        .col-1.col-md-2.text-end 5
        .col-2.text-end Students

      .row(v-for="exam in exams", :key="exam.date")
        .col-3.col-md-2 {{ exam.date }}
        .col-2.text-end(:class="{ 'text-accent': exam.percent.failed > 50 }") {{ exam.failed }}{{ display_percent ? '%' : '' }}
        .col-2.text-end {{ exam.three }}{{ display_percent ? '%' : '' }}
        .col-2.text-end {{ exam.four }}{{ display_percent ? '%' : '' }}
        .col-1.col-md-2.text-end {{ exam.five }}{{ display_percent ? '%' : '' }}
        .col-2.text-end {{ exam.total }}
</template>

<script>
import Http from "../../plugins/http";
import { preference } from "vue-preferences";

export default {
  name: "course",
  data: () => ({
    ready: false,

    name: undefined,
    code: undefined,
    owner: undefined,
    all_exams: [],
    without_reexams: [],
  }),

  computed: {
    hide_reexams: preference("hide_reexams", { defaultValue: true }),
    stack_bars: preference("show_stacked_exam_bars", { defaultValue: true }),
    display_percent: preference("display_exam_values_as_percent", {
      defaultValue: true,
    }),
    has_low_participation() {
      return this.exams.some((e) => e.total < 15);
    },

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

        const percentages = [exam.failed, exam.three, exam.four, exam.five].map(
          (e) => e.div(exam.total).mul(100)
        );
        const [failed, three, four, five] = Math.roundToTarget(
          percentages,
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

        exams = Object.values(exams_by_year)
          .map((exams) =>
            exams.reduce(
              (a, b) => (a.total > b.total ? a : b),
              { total: 0 },
              []
            )
          )
          .reverse();

        // If the main exam has not been held this year the algorithm will include
        // the reexam this year with the most participants
        // So if the last exam has an unreasonably low attendance we remove it
        if (exams.first().total < exams[exams.length - 2].total * 0.6) {
          exams.splice(0, 1);
        }
      }

      return exams;
    },

    exams() {
      let exams = this.filtered_exams;
      if (this.display_percent) {
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
        this.display_percent = false;
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

      this.all_exams = await Http.get(
        `course/${this.$route.params.code}/exams`
      );

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 575.98px) {
  .tenta-table {
    overflow-x: auto;
    & > * {
      left: 0px;
      min-width: 500px;
    }
  }
}
</style>
