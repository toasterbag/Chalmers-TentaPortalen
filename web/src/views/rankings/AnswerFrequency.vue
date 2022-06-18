<template lang="pug">
.row.justify-content-center.border-bottom
  .col-12.col-md-8.pb-3
    .row
      .col-12.col-md-6
        Select(
          v-model="academicYear",
          :values="availableYears",
          label="Academic year",
          :clearable="false"
        )
      .col-12.col-md-6
        Select(
          v-model="studyPeriod",
          :values="[1, 2, 3, 4]",
          label="Study period"
        )
    .d-flex.align-items-center(id="1")
      .fs-3.pe-2 Answer Frequency by division
      Key 1
    .text-muted How many students responded to the survey? (percentage)
    BarChart(
      :labels="labels",
      :data="data",
      :colorize="false",
      :showLabels="true"
    )
</template>

<script lang="ts">
import { useAPI } from "@plugins/api";
import { getMonth, getYear } from "date-fns";
import { defineComponent, ref, Ref, watch } from "vue";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

type Data = {
  label: string;
  data: number;
  color?: string;
  borderWidth?: number;
};

export default defineComponent({
  name: "SurveyAnswerFrequency",

  async setup() {
    const api = useAPI();

    const availableYears = new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date()))),
      );

    const academicYear: Ref<string> = ref(availableYears.first());
    const studyPeriod: Ref<number | undefined> = ref(undefined);

    const divisionColors = new Map([
      ["TKDAT", "#fb8500"],
      ["TKIEK", "#7209b7"],
      ["TKELT", "#ffb703"],
      ["TKITE", "#219ebc"],
      ["TKBIO", "#1d3557"],
      ["TKKEF", "pink"],
      ["TKKMT", "#40916c"],
      ["TKDES", "#c9184a"],
      ["TKTFY", "#444"],
      ["TKTEM", "#444"],
      ["TKSAM", "cyan"],
      ["TKAUT", "#777"],
      ["TKMAS", "#a47148"],
      ["TKARK", "#e5383b"],
      ["TKMED", "#ffb703"],
      ["TKGBS", "blue"],
      ["TKATK", "#e5383b"],

      ["TIEPL", "#f15bb5"],
      ["TIDAL", "#f72585"],
      ["TIELL", "#003566"],
    ]);

    const color = (code: string) => {
      const specific = divisionColors.get(code);
      if (specific) {
        return specific;
      }

      // if (code.startsWith("TK")) return "#c1121f11";
      // if (code.startsWith("TI")) return "#f15bb511";
      return "rgba(0,0,0,0.1)";
    };

    const labels: Ref<Array<string>> = ref([]);
    const data: Ref<Array<Data>> = ref([]);

    const refreshData = async () => {
      const answerFrequencyByDivision = await api.fetchAnswerFrequencyByDivision(
        academicYear.value,
        studyPeriod.value,
      );

      labels.value = answerFrequencyByDivision.map((e) => e.division);
      data.value = answerFrequencyByDivision.map((e) => ({
        label: e.division,
        data: e.answerFrequency?.mul(10000).round().div(100),
      }));
    };

    watch(academicYear, refreshData);
    watch(studyPeriod, refreshData);
    await refreshData();

    return {
      labels,
      data,
      availableYears,
      academicYear,
      studyPeriod,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  top: 10vh;
}
</style>
