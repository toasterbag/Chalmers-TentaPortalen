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
  name: "exam-bar-graph",
  extends: base_chart,
  props: {
    exams: { required: true },
    stacked: { default: false },
    percentMode: { default: false },
    unit: { default: "" },
  },
  mounted() {
    this.render();
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
      this.$refs.canvas.parentNode.style.height = "50vh";
      this.$refs.canvas.parentNode.style.position = "relative";
      const chart_data = {
        labels: this.exams.map((e) => e.date),
        series: ["U", "3", "4", "5"],
        datasets: [
          {
            label: "U",
            //stack: "Grades",
            backgroundColor: "rgba(240,49,24,0.8)",
            data: this.exams.map((e) => e.failed),
          },
          {
            label: "3",
            //stack: "Grades",
            backgroundColor: "rgba(169,214,63,0.8)",
            data: this.exams.map((e) => e.three),
          },
          {
            label: "4",
            //stack: "Grades",
            backgroundColor: "rgba(138,176,41,0.8)",
            data: this.exams.map((e) => e.four),
          },
          {
            label: "5",
            //stack: "Grades",
            backgroundColor: "rgba(92,126,14,0.8)",
            data: this.exams.map((e) => e.five),
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "label",
          callbacks: {
            /*
            label: (tooltipItem, data) => {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              label += ": ";
              if (this.is_mobile) {
                label += tooltipItem.xLabel;
              } else {
                label += tooltipItem.yLabel;
              }
              if (label) {
                label += this.unit;
              }
              return label;
              
            },*/
          },
        },
        scales: {
          xAxes: [
            {
              stacked: this.stacked,
            },
          ],
          yAxes: [
            {
              stacked: this.stacked,
              ticks: {
                min: 0,
                max: this.percentMode ? 100 : undefined,
              },
            },
          ],
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
