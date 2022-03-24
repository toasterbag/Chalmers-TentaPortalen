<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "LineChart",
  props: {
    labels: { required: true },
    data: { required: true },
    comments: { default: () => [] },
    colorize: { default: true },
    dots: {
      default: false,
    },
    scales: {
      default: undefined,
    },
  },
  mounted() {
    this.render();
  },
  updated() {
    this.render();
  },
  data: () => ({
    chart: undefined,
    color_list: [
      "#EF476F",
      "#06D6A0",
      "#FFD166",
      "#118AB2",
      "#073B4C",
      CSS.getVar("sp-purple"),
      CSS.getVar("sp-red"),
      CSS.getVar("sp-yellow"),
    ],
  }),
  computed: {
    chart_opts() {
      return {
        plugins: {
          comments: [
            ...this.comments,
            // {
            //   horizontal: true,
            //   index: "3.0",
            //   color: "hsla(357, 46%, 52%, 0.2)",
            // },
          ],
          tooltip: {
            intersect: false,
          },
        },

        scales: this.scales,
      };
    },
    chart_data() {
      return {
        labels: this.labels,
        datasets: this.data.map(({ label, data, color }, i) => {
          const line_color = this.colorize ? this.color_list[i] : "#c9184a55";
          const dot_color = this.dots ? line_color : "transparent";
          return {
            label,
            pointBackgroundColor: color ?? dot_color,
            pointBorderColor: color ?? dot_color,

            backgroundColor: color ?? line_color,
            borderColor: color ?? line_color,
            data,
          };
        }),
      };
    },
  },
  watch: {
    chart_opts() {
      this.render();
    },
    chart_data() {
      this.render();
    },
  },
  methods: {
    render() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.$refs.canvas.getContext("2d"), {
        type: "line",
        data: this.chart_data,
        options: this.chart_opts,
      });
    },
  },
};
</script>

<style lang="scss">
.canvas-containe {
  position: relative;
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
