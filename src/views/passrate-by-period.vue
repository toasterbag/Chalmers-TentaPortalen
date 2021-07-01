<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-between.py-md-0.py-3
    .col-md-2
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
          v-model="display_percent"
        )
        label.form-check-label(for="bars-percent")
          | Values as percent

  div
    .row.justify-content-center.pt-2
      .col-12
        exam-bar-graph(
          :exams="periods",
          :stacked="stack_bars",
          :percent-mode="display_percent",
          :unit="display_percent ? '%' : ''"
        )
    .tenta-table.p-md-5.py-3
      .row.header
        .col-3.col-md-2 Date
        .col-2.text-end U
        .col-2.text-end 3
        .col-2.text-end 4
        .col-1.col-md-2.text-end 5
        .col-2.text-end Students

      .row(v-for="period in periods", :key="period.date")
        .col-3.col-md-2 {{ period.date }}
        .col-2.text-end(:class="{ 'text-accent': period.percent.failed > 50 }")
          | {{ period.failed }}{{ display_percent ? '%' : '' }}
        .col-2.text-end {{ period.three }}{{ display_percent ? '%' : '' }}
        .col-2.text-end {{ period.four }}{{ display_percent ? '%' : '' }}
        .col-1.col-md-2.text-end {{ period.five }}{{ display_percent ? '%' : '' }}
        .col-2.text-end {{ period.total }}
</template>

<script>
import Http from "../plugins/http";
import { preference } from "vue-preferences";

export default {
  name: "passrate-by-period",
  data: () => ({
    ready: false,

    name: undefined,
    code: undefined,
    owner: undefined,
  }),

  computed: {
    stack_bars: preference("show_stacked_exam_bars", { defaultValue: true }),
    display_percent: preference("display_exam_values_as_percent", {
      defaultValue: true,
    }),
    periods() {
      let periods = this.unfiltered_periods;
      if (this.display_percent) {
        periods = this.unfiltered_periods.map((e) =>
          Object.assign({}, e, e.percent)
        );
      }
      return periods;
    },
  },
  watch: {
    $route() {
      this.load();
    },
    stack_bars(val) {
      if (!val) {
        this.display_percent = false;
      }
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const res = await Http.get(`periods/passrate`);

      this.unfiltered_periods = Object.entries(res).map(([period, stats]) => {
        stats.total = stats.failed + stats.three + stats.four + stats.five;
        stats.percent = {};

        const percentages = [
          stats.failed,
          stats.three,
          stats.four,
          stats.five,
        ].map((e) => e.div(stats.total).mul(100));
        const [failed, three, four, five] = Math.roundToTarget(
          percentages,
          100
        );

        stats.percent.failed = failed;
        stats.percent.three = three;
        stats.percent.four = four;
        stats.percent.five = five;
        stats.date = period;
        return stats;
      });

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
