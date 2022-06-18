<template lang="pug">
.row.justify-content-center
  .col-10.col-lg-8.p-4
    .row
      ExamBarChart(
        :exams="periodData",
      )
    .row.py-3
      .d-flex.justify-content-end
        .form-check.pe-4
          input#stack-bars.form-check-input(
            type="checkbox",
            v-model="stackBars"
          )
          label.form-check-label(for="stack-bars")
            | Stack bars
        .form-check
          input#bars-percent.form-check-input(
            type="checkbox",
            :disabled="!stackBars",
            v-model="displayValuesAsPercent"
          )
          label.form-check-label(for="bars-percent")
            | Values as percent
    .tenta-table.pt-2
      .row.header
        .col-3.col-md-2 Period
        .col-2.text-end U
        .col-2.text-end 3
        .col-2.text-end 4
        .col-1.col-md-2.text-end 5
        .col-2.text-end Students

      .row(v-for="period in periodData", :key="period.date")
        .col-3.col-md-2 {{ period.date }}
        .col-2.text-end(:class="{ 'text-accent': period.percent.failed >= 50 }")
          | {{ period.failed }}{{ unit }}
        .col-2.text-end {{ period.three }}{{ unit }}
        .col-2.text-end {{ period.four }}{{ unit }}
        .col-1.col-md-2.text-end {{ period.five }}{{ unit }}
        .col-2.text-end {{ period.total }}
</template>

<script lang="ts">
import Http from "../plugins/http";
import { computed, defineComponent } from "vue";
import { storeToRefs } from 'pinia'
import { usePreferences } from "../plugins/preferences";

export default defineComponent({
  name: "PassrateByPeriod",

  async setup() {
    const { stackBars, displayValuesAsPercent, unit } = storeToRefs(usePreferences());

    const res: { [key in string]: any } = await Http.get(`periods/passrate`);

    const unfilteredPeriodData = Object.entries(res).map(([period, stats]) => {
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
      stats.date = period
        .replace("sp_1_exams", "Study period 1 exams")
        .replace("sp_2_exams", "Study period 2 exams")
        .replace("sp_3_exams", "Study period 3 exams")
        .replace("sp_4_exams", "Study period 4 exams")
        .replace("august_re_exams", "August re-exams")
        .replace("october_re_exams", "October re-exams")
        .replace("january_re_exams", "January re-exams")
        .replace("easter_re_exams", "Easter re-exams")
        .replace("june_re_exams", "June re-exams");
      return stats;
    });

    const periodData = computed(() => {
      let periods = unfilteredPeriodData;
      if (displayValuesAsPercent.value) {
        periods = unfilteredPeriodData.map((e) =>
          Object.assign({}, e, e.percent)
        );
      }
      return periods;
    })


    return {
      stackBars,
      displayValuesAsPercent,
      unit,
      periodData
    }
  },


});
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
