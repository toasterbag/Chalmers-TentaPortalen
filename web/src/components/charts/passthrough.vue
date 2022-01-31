<template lang="pug">
.canvas-container
  canvas(ref="canvas")
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "passthrough-chart",
  props: {
    labels: { required: true },
    programmes: { required: true },
    comments: { default: () => [] },
    exams: { default: () => [] },
  },
  mounted() {
    this.render();
  },
  data: () => ({
    chart: undefined,
    colors: {
      TKDAT: "#e85d04",
      TKITE: "#0a9396",
      TKMED: "#43aa8b",
      TKELT: "#ffba08",
      TIDAL: "#f72585",
      TIEPL: "#c77dff",
      TIELL: "#f72585",
      TKIEK: "#5a189a",
      Average: "#000",
    },
    generic_color: (name) => {
      if (name.startsWith("TI")) return "#e6394633";
      else if (name.startsWith("TK")) return "#1d355733";
      else return "#c9184a55";
    },
  }),
  computed: {
    scales() {
      return Object.assign({
        ySurvey: {
          min: 0,
          max: 1,
        },
      });
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
        },
        scales: this.scales,
      };
    },
    chart_data() {
      return {
        labels: this.labels,
        datasets: this.programmes.map(({ label, data }) => ({
          label,
          type: "line",
          backgroundColor: this.colors[label] ?? this.generic_color(label),
          borderColor: this.colors[label] ?? this.generic_color(label),
          data,
        })),
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
