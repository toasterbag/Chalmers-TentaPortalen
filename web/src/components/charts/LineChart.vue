<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script lang="ts">
import { Chart, ChartOptions } from "chart.js";
import { storeToRefs } from "pinia";
import { computed, defineComponent, PropType, Ref, ref, watchEffect } from "vue";
import { usePreferences } from "../../plugins/preferences";
import { useTheme } from "../../plugins/theme";
const theme = useTheme();

type Data = {
  label: string;
  data: Array<number>,
  color: string,
  borderWidth?: number,
}

export default defineComponent({
  name: "LineChart",
  props: {
    labels: {
      required: true,
      type: Object as PropType<Array<string>>
    },
    data: {
      required: true,
      type: Object as PropType<Array<Data>>
    },
    comments: {
      default: () => []
    },
    colorize: {
      default: true
    },
    dots: {
      default: false,
    },
    scales: {
      default: undefined,
    },
    showLabels: {
      default: true,
    }
  },
  setup(props) {
    const theme = useTheme();
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chart: Chart | undefined = undefined;

    const isDesktop = getComputedStyle(document.documentElement).getPropertyValue(
      "--is-desktop",
    ) === "true";

    const colorList = [
      "#EF476F",
      "#06D6A0",
      "#FFD166",
      "#118AB2",
      "#073B4C",
      theme.get("sp-purple"),
      theme.get("sp-red"),
      theme.get("sp-yellow"),
    ];


    const render = () => {
      if (canvas.value !== null) {
        const context = canvas.value.getContext("2d");
        if (context !== null) {
          chart?.destroy();

          const plugins: any = {
            comments: props.comments,

            tooltip: {
              intersect: false,
              mode: 'index',
              enabled: props.showLabels
            },
            legend: {
              display: props.showLabels,
            }
          };

          chart = new Chart(context, {
            type: "line",
            data: {
              labels: props.labels,
              datasets: props.data.map(({ label, data, color, borderWidth }, i) => {
                const line_color = props.colorize ? colorList[i] : "#c9184a55";
                const dot_color = props.dots ? line_color : "transparent";
                return {
                  label,
                  pointBackgroundColor: color ?? dot_color,
                  pointBorderColor: color ?? dot_color,

                  backgroundColor: color ?? line_color,
                  borderColor: color ?? line_color,
                  borderWidth: borderWidth ?? 3,
                  data,
                };
              }),
            },
            options: {
              plugins,

              scales: props.scales,
              maintainAspectRatio: isDesktop,
            }
          })

        }
      }
    }
    watchEffect(() => render());

    return { canvas }
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
