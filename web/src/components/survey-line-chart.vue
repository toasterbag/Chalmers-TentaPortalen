<template lang="pug">
.canvas-container
  .text-red Blue vertical lines indicates when the course changed examiner
  canvas(ref="canvas")
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "survey-line-chart",
  props: {
    labels: { required: true },
    means: { required: true },
    medians: { required: false },
    displayMean: { default: true },
    displayExams: { default: false },
    comments: { default: () => [] },

    exams: { default: () => [] },
  },
  mounted() {
    this.render();
  },
  data: () => ({
    chart: undefined,
  }),
  computed: {
    exam_dataset() {
      if (!this.displayExams || this.exams.isEmpty()) return [];
      return [
        {
          label: "U",
          type: "bar",
          backgroundColor: CSS.getVar("sp-red-30"), //"rgba(240,49,24,0.8)",
          data: this.exams.map((e) => e.failed),
          stack: "exam",
          yAxisID: "yExams",
        },
        {
          label: "3",
          type: "bar",
          backgroundColor: CSS.getVar("sp-yellow-30"), //"rgba(169,214,63,0.8)",
          data: this.exams.map((e) => e.three),
          stack: "exam",
          yAxisID: "yExams",
        },
        {
          label: "4",
          type: "bar",
          backgroundColor: CSS.getVar("sp-green-30"), // "rgba(138,176,41,0.8)",
          data: this.exams.map((e) => e.four),
          stack: "exam",
          yAxisID: "yExams",
        },
        {
          label: "5",
          type: "bar",
          backgroundColor: CSS.getVar("sp-blue-30"), // "rgba(92,126,14,0.8)",
          data: this.exams.map((e) => e.five),
          stack: "exam",
          yAxisID: "yExams",
        },
      ];
    },
    median_dataset() {
      if (this.medians === undefined) return [];
      return [
        {
          label: "Median",
          type: "line",
          backgroundColor: CSS.getVar("sp-green"),
          borderColor: CSS.getVar("sp-green"),
          data: this.medians,
          yAxisId: "ySurvey",
        },
      ];
    },
    scales() {
      return Object.assign(
        {
          ySurvey: {
            min: 1,
            max: 5,
          },
          x: {
            stacked: true,
          },
        },
        this.displayExams
          ? {
              yExams: {
                min: 0,
                max: 100,
                stacked: true,
              },
            }
          : {},
      );
    },
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
        datasets: [
          {
            label: "Mean",
            type: "line",
            backgroundColor: CSS.getVar("sp-red"), //"rgba(240,49,24,0.8)",
            borderColor: CSS.getVar("sp-red"),
            data: this.means,
            yAxisId: "ySurvey",
          },
          ...this.median_dataset,
          ...this.exam_dataset,
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
