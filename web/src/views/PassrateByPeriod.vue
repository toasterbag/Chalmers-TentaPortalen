<template lang="pug">
.flex.flex-col.justify-center.gap-4.view-margin
  ExamBarChart(:exams="periodData")
  .row.py-3
    .grid.grid-cols-1.justify-content-end.gap-32(class="lg:grid-cols-2")
      .col-span-1.flex.justify-between
        div Stack bars
        RetroSwitch(v-model="stackBars")
      .col-span-1.flex.justify-between
        div Values as percent
        RetroSwitch(v-model="displayValuesAsPercent", :disabled="!stackBars")
  table.tp-table
    thead
      th Period
      th.text-end U
      th.text-end 3
      th.text-end 4
      th.text-end 5
      th.text-end Students

    tbody
      tr(v-for="period in periodData", :key="period.date")
        td {{ period.date }}
        td.text-end(:class="{ 'text-accent': period.percent.failed >= 50 }")
          | {{ period.failed }}{{ unit }}
        td.text-end {{ period.three }}{{ unit }}
        td.text-end {{ period.four }}{{ unit }}
        td.text-end {{ period.five }}{{ unit }}
        td.text-end {{ period.total }}
</template>

<script lang="ts">
import Http from "../plugins/http";
import { computed, defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { usePreferences } from "../plugins/preferences";
import { useLocalization } from "@plugins/localization";

export default defineComponent({
  name: "PassrateByPeriod",

  async setup() {
    const l = useLocalization();
    const { tl } = storeToRefs(l);
    document.title = l.title(tl.value.pages.passrate_by_exam_period.title);

    const { stackBars, displayValuesAsPercent, unit } = storeToRefs(
      usePreferences(),
    );

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
      const [failed, three, four, five] = Math.roundToTarget(percentages, 100);

      stats.percent.failed = failed;
      stats.percent.three = three;
      stats.percent.four = four;
      stats.percent.five = five;
      stats.date = period
        .replace("sp_1_exams", "SP1 exams")
        .replace("sp_2_exams", "SP2 exams")
        .replace("sp_3_exams", "SP3 exams")
        .replace("sp_4_exams", "SP4 exams")
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
          Object.assign({}, e, e.percent),
        );
      }
      return periods;
    });

    return {
      stackBars,
      displayValuesAsPercent,
      unit,
      periodData,
    };
  },
});
</script>
