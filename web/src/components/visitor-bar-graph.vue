<script>
import { Bar, HorizontalBar } from "vue-chartjs";
const is_mobile = window.innerHeight > window.innerWidth;

let base_chart;
if (is_mobile) {
  base_chart = HorizontalBar;
} else {
  base_chart = Bar;
}

export default {
  name: "visitor-bar-graph",
  extends: base_chart,
  props: {
    visitors: { required: true },
  },
  mounted() {
    this.render();
  },
  watch: {
    exams() {
      this.render();
    },
  },
  methods: {
    render() {
      this.$refs.canvas.parentNode.style.height = "50vh";
      this.$refs.canvas.parentNode.style.position = "relative";
      const chart_data = {
        labels: this.exams.map((e) => e.date),
        datasets: [
          {
            label: "Visitors",
            backgroundColor: "rgba(240,49,24,0.8)",
            data: this.visitors.map((e) => e.value),
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "label",
        },
      };

      if (is_mobile) {
        this.$refs.canvas.parentNode.style.height = "100vh";
        //chart_data.datasets.
      }

      this.renderChart(chart_data, options);
    },
  },
};
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
