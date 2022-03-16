<template lang="pug">
div
  teleport(to="sidebar-right")
    .d-flex.justify-content-end.sticky-top.pt-4
      .sidebar
        //- div 
        //-   b Examinationsform
        //- div
        //-   select.form-select(v-model="assesment_kind")
        //-     option(selected, :value="undefined") Alla
        //-     option(value="Tentamen") Tentamen

        //- br
        //- div
        //-   b Årskurs
        //- div
        //-   select.form-select(v-model="grade")
        //-     option(selected, :value="1") 1
        //-     option(:value="2") 2
        //-     option(:value="3") 3
        //- br

        //- div
        //-   b Tills läsperiod
        //- div
        //-   select.form-select(v-model="until_period")
        //-     option(selected, :value="1") LP1
        //-     option(:value="2") LP2
        //- br

  Spinner(v-if="charts.isEmpty()")
  div(v-else)
    .mt-4(v-for="{title, labels, data} of charts")
      h1 {{ title }}
      .row.justify-content-between
        LineChart(:labels="labels", :data="data", :scales="scales")
</template>

<script>
import Http from "../../plugins/http";
import LineChart from "../../components/charts/LineChart.vue";

export default {
  name: "passthrough",
  data: () => ({
    ready: false,
    assesment_kind: undefined,
    grade: 1,
    until_period: 1,
    debounce: 0,
    charts: [],
    show_hst: false,
    scales: {
      y: {
        min: 1,
        max: 5,
      },
    },
    EDITI: [
      "TKDAT",
      "TKMED",
      "TKELT",
      "TKITE",
      "TIDAL",
      "TIEPL",
      // Samläser med TIDAL så statistiken är samma
      "TIELL",
      "TKIEK",
    ],
  }),
  created() {
    this.load();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name.startsWith("course/")) {
      setTimeout(() => {
        this.load();
      }, 20);
    }
    next();
  },
  methods: {
    format_data(n, delta) {
      let str =
        n === undefined || n === null
          ? "N/A"
          : `${n.mul(100).round().toString()}%`;
      if (delta !== undefined) {
        str += `(${delta})`;
      }
      return str;
    },
    calc_delta(data) {
      return data.map((result, i) => {
        if (data[i - 1] !== null && result !== null) {
          const delta = (result - data[i - 1]).mul(100).round();
          let color;
          switch (true) {
            case delta > 0:
              color = "blue";
              break;
            case delta < 0:
              color = "red";
              break;
            default:
              color = "text";
              break;
          }
          return {
            color: color,
            value: delta,
            prefix: delta > 0 ? "+" : "",
            suffix: "%",
          };
        }
        return { color: "text", value: "N/A", prefix: "", suffix: "" };
      });
    },
    async load() {
      this.ready = false;
      this.charts = [];

      // const query = {};
      // if (this.assesment_kind !== undefined) {
      //     query.assessment_kind = this.assesment_kind;
      // }
      // if (this.grade !== undefined) {
      //     query.grade = this.grade;
      // }
      // if (this.until_period !== undefined) {
      //     query.until_period = this.until_period;
      // }
      {
        let res = await Http.get(`quality/survey/category`, {
          query: {
            programmes: JSON.stringify(this.EDITI),
          },
        });

        this.charts.push({
          title: "EDIT-I",
          data: res.data,
          labels: res.labels,
        });
      }
      this.ready = true;
    },
  },
  components: { LineChart },
};
</script>

<style lang="scss" scoped></style>
