<template lang="pug">
canvas(ref="canvas")
</template>

<script lang="ts">
import { Chart } from "chart.js";
import { storeToRefs } from "pinia";
import { defineComponent, PropType, Ref, ref, watchEffect, watch } from "vue";
import { Exam } from "../../plugins/api/types";
import { usePreferences } from "../../plugins/preferences";
import { useTheme } from "../../plugins/theme";

export default defineComponent({
  name: "ExamBarChart",
  props: {
    exams: { required: true, type: Object as unknown as PropType<Array<Exam>> },
    comments: { default: () => [] },
    gradingSystem: { default: "ThreeFourFive" },
  },

  setup(props) {
    const theme = useTheme();
    const { stackBars, displayValuesAsPercent, unit, themeDummy } = storeToRefs(
      usePreferences(),
    );
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chart: Chart | undefined = undefined;

    const render = () => {
      if (canvas.value !== null) {
        const context = canvas.value.getContext("2d");
        if (context !== null) {
          const plugins: any = {
            comments: props.comments,
            tooltip: {
              callbacks: {
                afterBody: (context: any) => {
                  const total = context
                    .map((series: any) => series.dataset.data[series.dataIndex])
                    .sum();
                  return `Total: ${total}${unit.value}`;
                },
              },
              intersect: false,
              mode: "index",
            },
            legend: {
              labels: {
                color: theme.get("tp-chart-content"),
              },
            },
          };
          chart?.destroy();
          chart = new Chart(context, {
            type: "bar",
            data: {
              labels: props.exams.map((e) => e.date),
              datasets:
                props.gradingSystem == "PassFail"
                  ? [
                      {
                        label: "U",
                        backgroundColor: theme.get("tp-chart-failed"), //"rgba(240,49,24,0.8)",
                        data: props.exams.map((e) => e.failed),
                      },
                      {
                        label: "G",
                        backgroundColor: theme.get("tp-chart-four"), //"rgba(169,214,63,0.8)",
                        data: props.exams.map((e) => e.three),
                      },
                    ]
                  : [
                      {
                        label: "U",
                        backgroundColor: theme.get("tp-chart-failed"), //"rgba(240,49,24,0.8)",
                        data: props.exams.map((e) => e.failed),
                      },
                      {
                        label: "3",
                        backgroundColor: theme.get("tp-chart-three"), //"rgba(169,214,63,0.8)",
                        data: props.exams.map((e) => e.three),
                      },
                      {
                        label: "4",
                        backgroundColor: theme.get("tp-chart-four"), // "rgba(138,176,41,0.8)",
                        data: props.exams.map((e) => e.four),
                      },
                      {
                        label: "5",
                        backgroundColor: theme.get("tp-chart-five"), // "rgba(92,126,14,0.8)",
                        data: props.exams.map((e) => e.five),
                      },
                    ],
            },
            options: {
              responsive: true,
              // maintainAspectRatio: !this.is_mobile,
              // indexAxis: this.is_mobile ? "y" : "x",
              plugins,
              scales: {
                x: {
                  grid: {
                    color: theme.get("tp-chart-border"),
                    borderColor: theme.get("tp-chart-border"),
                    tickColor: theme.get("tp-chart-border"),
                  },
                  ticks: {
                    color: theme.get("tp-chart-content"),
                    textStrokeColor: theme.get("tp-chart-content"),
                  },
                  stacked: stackBars.value,
                },
                y: {
                  grid: {
                    color: theme.get("tp-chart-border"),
                    borderColor: theme.get("tp-chart-border"),
                    tickColor: theme.get("tp-chart-border"),
                  },
                  ticks: {
                    color: theme.get("tp-chart-content"),
                    textStrokeColor: theme.get("tp-chart-content"),
                  },
                  stacked: stackBars.value,
                  min: 0,
                  max: displayValuesAsPercent.value ? 100 : undefined,
                },
              },
            },
          });
        }
      }
    };
    watchEffect(() => render());
    watch(themeDummy, () => render());

    return {
      canvas,
    };
  },
  data: () => ({
    // is_mobile: document.body.offsetWidth < document.body.offsetHeight,
  }),
  methods: {
    render() {
      // if (this.is_mobile) {
      //   this.$refs.canvas.parentNode.style.width = "100%";
      //   this.$refs.canvas.parentNode.style.height = "100vh";
      // }
      // if (this.$refs.canvas == null) {
      //   setTimeout(() => this.render(), 200);
      //   return;
      // }
    },
  },
});
</script>

<style lang="scss">
.chartjs-tooltip {
  opacity: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 3px;
  transition: all 0.1s ease;
  pointer-events: none;
  transform: translate(-50%, 0);
}
.chartjs-tooltip-key {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
}
</style>
