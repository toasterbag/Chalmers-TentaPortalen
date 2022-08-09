<script lang="ts">
import { useAPI } from "@plugins/api";
import { BarData } from "@plugins/charts/types";
import { getMonth, getYear } from "date-fns";
import { defineComponent, ref, Ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useLocalization } from "../../plugins/localization";

const date_to_academic_year = (date: Date) =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

export default defineComponent({
  name: "SurveyAnswerFrequency",

  async setup() {
    const api = useAPI();

    const l = useLocalization();
    const { tl } = storeToRefs(l);
    document.title = l.title(tl.value.pages.answer_frequency_by_division.title);

    const availableYears = new Array(8)
      .fill(1)
      .map((_, i) => getYear(new Date()) - i)
      .map((year) =>
        date_to_academic_year(new Date(year, getMonth(new Date()))),
      );

    const academicYear: Ref<string> = ref(availableYears.first());
    const studyPeriod: Ref<number | undefined> = ref(undefined);

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 32;
    patternCanvas.height = 32;
    const patternContext = patternCanvas.getContext("2d");
    if (patternContext === null) {
      throw new Error("Could not get canvas context");
    }

    const drawZigzag = (fillColor: string, strokeColor: string) => {
      const size = 32;
      const halfSize = size;
      const gap = 0;

      const offsetY = 0;
      const offsetX = 0;

      patternContext.fillStyle = fillColor;
      patternContext.strokeStyle = strokeColor;
      patternContext.lineWidth = 6;
      patternContext.lineJoin = "round";
      patternContext.lineCap = "round";

      patternContext.fillRect(0, 0, size, size);

      patternContext.moveTo(offsetX + gap, offsetY + gap);
      patternContext.lineTo(halfSize - gap + offsetX, halfSize - gap + offsetY);
      patternContext.moveTo(offsetX + gap, halfSize - gap + offsetY);
      patternContext.lineTo(halfSize - gap + offsetX, offsetY + gap);

      patternContext.stroke();

      return patternContext.createPattern(patternCanvas, "repeat");
    };

    const divisionColors = new Map([
      ["D", "#fb8500"],
      ["I", "#7209b7"],
      ["E", "#ffb703"],
      ["IT", "#219ebc"],
      ["KfKb", drawZigzag("green", "#444") ?? "#1d3557"],
      ["K", "green"],
      ["F", "#40916c"],
      ["TD", "#c9184a"],
      ["F", "#444"],
      ["V", "cyan"],
      ["Z", "#777"],
      ["M", "#a47148"],
      ["A", "#e5383b"],
      ["GS", drawZigzag("#18515E", "yellow") ?? "#F00"],
      ["AT", "#e5383b"],
      ["H", "#f72585"],
      ["H", "#f72585"],
      ["Æ", "rgb(157, 197, 65)"],
      ["Sjö", "#000080"],
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
    const data: Ref<Array<BarData>> = ref([]);

    const refreshData = async () => {
      const answerFrequencyByDivision =
        await api.fetchAnswerFrequencyByDivision(
          academicYear.value,
          studyPeriod.value,
        );

      labels.value = answerFrequencyByDivision.map((e) => e.division);
      data.value = answerFrequencyByDivision.map((e) => ({
        label: e.division,
        color: color(e.division),
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
      tl,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.justify-center
  .grid.grid-cols-2.gap-4
    .col-span-1
      Select(
        v-model="academicYear",
        :values="availableYears",
        :label="tl.terms.academic_year",
        :clearable="false"
      )
    .col-span-1
      Select(
        v-model="studyPeriod",
        :values="[1, 2, 3, 4]",
        :label="tl.terms.study_period"
      )
  .p-4.rounded.bg-base-200
    h3.mb-4 {{ tl.pages.answer_frequency_by_division.heading }}
    //- .text-muted How many students responded to the survey? (percentage)
    BarChart(
      :labels="labels",
      :data="data",
      :colorize="false",
      :showLegend="false"
    )
</template>
