<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "exam-bar-graph",
  props: {
    exams: { required: true },
    stacked: { default: false },
    percentMode: { default: false },
    unit: { default: "" },
  },
  mounted() {
    this.render();
  },
  data: () => ({ chart: undefined }),
  computed: {
    chart_opts() {
      return {
        scales: {
          x: {
            stacked: this.stacked,
          },
          y: {
            stacked: this.stacked,
            min: 0,
            max: this.percentMode ? 100 : undefined,
          },
        },
      };
    },
    chart_data() {
      return {
        labels: this.exams.map((e) => e.date),
        datasets: [
          {
            label: "U",
            backgroundColor: "rgba(240,49,24,0.8)",
            data: this.exams.map((e) => e.failed),
          },
          {
            label: "3",
            backgroundColor: "rgba(169,214,63,0.8)",
            data: this.exams.map((e) => e.three),
          },
          {
            label: "4",
            backgroundColor: "rgba(138,176,41,0.8)",
            data: this.exams.map((e) => e.four),
          },
          {
            label: "5",
            backgroundColor: "rgba(92,126,14,0.8)",
            data: this.exams.map((e) => e.five),
          },
        ],
      };
    },
  },
  watch: {
    exams() {
      this.render();
    },
    stacked() {
      this.render();
    },
  },
  methods: {
    render() {
      if (this.chart) {
        this.chart.destroy();
      }
      const is_mobile = "ontouchstart" in document.documentElement;

      this.$refs.canvas.parentNode.style.height = "50vh";

      if (is_mobile) {
        this.$refs.canvas.parentNode.style.height = "100vh";
      }

      this.chart = new Chart(this.$refs.canvas.getContext("2d"), {
        type: "bar",
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
