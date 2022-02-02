<template lang="pug">
div
  teleport(to="sidebar-right")
    .d-flex.justify-content-end.sticky-top.pt-4
      .sidebar
        div 
          b Examinationsform
        div
          select.form-select(v-model="assessment_filter")
            option(selected, :value="undefined") Alla
            option(value="Tentamen") Tentamen

        br
        div
          b Årskurs
        div
          select.form-select(v-model="grade")
            option(selected, :value="1") 1
            option(:value="2") 2
            option(:value="3") 3

  Spinner(v-if="charts.isEmpty()")
  div(v-else)
    .mt-4(v-for="{title, labels, data} of charts")
      h1 {{ title }}
      .row.justify-content-between
        passthrough-chart(
          :labels="labels",
          :programmes="data",
          :comments="comments"
        )
      table.table.table-hover.mt-4
        thead
          tr
            td Programme
            td.text-end(v-for="label in labels.skip(1)") {{ label.replace(/^20(\d\d)\/20(\d\d)/g, '$1/$2') }}
        tbody
          tr(
            v-for="{ label: programmme, data, delta } in data",
            :class="{ 'bg-primary-30': EDITI.includes(programmme) && title !== 'EDIT-I' }"
          )
            td {{ programmme }}
            td.text-end(v-for="(delta, index) in delta.skip(1)")
              span(:class="[`text-${delta.color}`]") {{ delta.prefix }}{{ delta.value }}{{ delta.suffix }}
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "passthrough",
  data: () => ({
    ready: false,
    assessment_filter: undefined,
    grade: 1,
    debounce: 0,
    charts: [],
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
  watch: {
    assessment_filter() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load();
      }, 500);
    },
    grade() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load();
      }, 500);
    },
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
    calc_delta({ data }) {
      return data.map((result, i) => {
        if (data[i - 1] !== undefined) {
          const delta = (result - data[i - 1]).mul(100).round();
          return {
            color: delta > 0 ? "blue" : "red",
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
      this.comments = [
        {
          index: "2020/2021",
          comment: "COVID-19",
          color: "rgba(91, 142, 125, 0.3)",
        },
      ];

      const query = {};
      if (this.assessment_filter !== undefined) {
        query.assessment_kind = this.assessment_filter;
      }
      if (this.grade !== undefined) {
        query.grade = this.grade;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "TK",
          },
        });
        this.charts.push({
          title: "Civilingenjör",
          data: res.data.map((e) => ({ ...e, delta: this.calc_delta(e) })),
          labels: res.labels,
        });
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "TI",
          },
        });
        this.charts.push({
          title: "Högskoleingenjör",
          data: res.data.map((e) => ({ ...e, delta: this.calc_delta(e) })),
          labels: res.labels,
        });
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "MP",
          },
        });
        this.charts.push({
          title: "Master",
          data: res.data.map((e) => ({ ...e, delta: this.calc_delta(e) })),
          labels: res.labels,
        });
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programmes: JSON.stringify(this.EDITI),
          },
        });
        this.charts.push({
          title: "EDIT-I",
          data: res.data.map((e) => ({ ...e, delta: this.calc_delta(e) })),
          labels: res.labels,
        });
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programmes: JSON.stringify(["TAFFS", "TSILO", "TSJKL", "SBVII"]),
          },
        });
        this.charts.push({
          title: "Övriga",
          data: res.data.map((e) => ({ ...e, delta: this.calc_delta(e) })),
          labels: res.labels,
        });
      }

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
