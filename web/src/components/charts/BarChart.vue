<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script lang="ts">
import { BarData } from "@plugins/charts/types";
import { usePreferences } from "@plugins/preferences";
import { Chart } from "chart.js";
import { storeToRefs } from "pinia";
import { defineComponent, PropType, Ref, ref, watchEffect, watch } from "vue";
import { useTheme } from "../../plugins/theme";

export default defineComponent({
  name: "BarChart",
  props: {
    labels: {
      required: true,
      type: Object as PropType<Array<string>>,
    },
    data: {
      required: true,
      type: Object as PropType<Array<BarData>>,
    },
    colorize: {
      default: true,
    },
    showLabels: {
      default: true,
    },
    showLegend: {
      default: true,
    },
  },
  setup(props) {
    const theme = useTheme();
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chart: Chart | undefined = undefined;

    const { themeDummy } = storeToRefs(usePreferences());

    const isDesktop =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--is-desktop",
      ) === "true";

    const colorList = [
      "#EF476F",
      "#06D6A0",
      "#FFD166",
      "#118AB2",
      "#073B4C",
      theme.get("tp-purple"),
      theme.get("tp-red"),
      theme.get("tp-yellow"),
    ];

    const render = () => {
      if (canvas.value !== null) {
        const context = canvas.value.getContext("2d");
        if (context !== null) {
          chart?.destroy();

          const plugins: any = {
            tooltip: {
              intersect: false,
              mode: "index",
              enabled: props.showLabels,
            },
            legend: {
              display: props.showLegend,
            },
          };

          chart = new Chart(context, {
            type: "bar",
            data: {
              labels: props.labels,
              datasets: [
                {
                  // label: props.data.map(d => d.label),
                  backgroundColor: props.data.map((d) => d.color ?? "#EF476F"),
                  borderColor: props.data.map((d) => d.color ?? "#EF476F"),
                  // borderWidth: 3,
                  data: props.data.map((d) => d.data),
                },
              ],
            },
            options: {
              plugins,

              maintainAspectRatio: isDesktop,
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
                },
              },
            },
          });
        }
      }
    };
    watchEffect(() => render());
    watch(themeDummy, () => render());

    return { canvas };
  },
});
</script>

<style lang="scss">
.canvas-container {
  position: relative;
  min-height: 400px;
}
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
