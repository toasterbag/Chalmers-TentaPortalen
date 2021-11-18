<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "survey-bar-chart",
  props: {
    labels: { required: true },
    means: { required: true },
    medians: { required: true },
    displayMean: { default: true },
  },
  mounted() {
    this.render();
  },
  data: () => ({ chart: undefined }),
  computed: {
    chart_opts() {
      return {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: 1,
            max: 5,
          },
        },
      };
    },
    chart_data() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Mean",
            type: "line",
            backgroundColor: CSS.getVar("sp-red"), //"rgba(240,49,24,0.8)",
            borderColor: CSS.getVar("sp-red"),
            data: this.means,
          },
          {
            label: "Median",
            type: "line",
            backgroundColor: CSS.getVar("sp-green"),
            borderColor: CSS.getVar("sp-green"),
            data: this.medians,
          },
        ],
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
