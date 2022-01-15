<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "exam-area-chart",
  props: {
    exams: { required: true },
    stacked: { default: false },
    percentMode: { default: false },
    unit: { default: "" },
    comments: { default: () => [] },
  },
  mounted() {
    this.render();
  },
  data: () => ({
    is_mobile: document.body.offsetWidth < document.body.offsetHeight,
    chart: undefined,
  }),
  computed: {
    chart_opts() {
      return {
        responsive: true,
        maintainAspectRatio: !this.is_mobile,
        indexAxis: this.is_mobile ? "y" : "x",
        plugins: {
          comments: this.comments,
          tooltip: {
            callbacks: {
              afterBody: function (context) {
                const total = context
                  .map((series) => series.dataset.data[series.dataIndex])
                  .sum();
                return `Total: ${total}`;
              },
            },
          },
        },
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
            backgroundColor: CSS.getVar("sp-red-70"),
            data: this.exams.map((e) => e.failed),
            fill: "origin",
          },
          {
            label: "3",
            backgroundColor: CSS.getVar("sp-yellow-70"),
            data: this.exams.map((e) => e.three),
            fill: 0,
          },
          {
            label: "4",
            backgroundColor: CSS.getVar("sp-green-70"),
            data: this.exams.map((e) => e.four),
            fill: +1,
          },
          {
            label: "5",
            backgroundColor: CSS.getVar("sp-blue-70"),
            data: this.exams.map((e) => e.five),
            fill: +1,
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

      if (this.is_mobile) {
        this.$refs.canvas.parentNode.style.width = "100%";
        this.$refs.canvas.parentNode.style.height = "100vh";
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
