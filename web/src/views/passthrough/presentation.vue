<template lang="pug">
div
  teleport(to="#sidebar-right")
    .flex.justify-content-end.sticky-top.pt-4
      .sidebar
        //- div 
        //-   b Examinationsform
        //- div
        //-   select.form-select(v-model="assessment_kind")
        //-     option(selected, :value="undefined") Alla
        //-     option(value="Tentamen") Tentamen

        br
        div
          b Årskurs
        div
          select.form-select(v-model="grade")
            option(selected, :value="1") 1
            option(:value="2") 2
            option(:value="3") 3
        br

        div
          b Läsperiod
        div
          select.form-select(v-model="study_period")
            option(selected, :value="1") LP1
            option(:value="2") LP2
        br

        //- .form-check
        //-   input#show-hst.form-check-input(type="checkbox", v-model="show_hst")
        //-   label.form-check-label(for="show-hst")
        //-     | Visa HST

  Spinner(v-if="charts.isEmpty()")
  div(v-else)
    .mt-4(v-for="{title, labels, data} of charts")
      h1 {{ title }}
      .text-warning ⚠️ Does not take into account courses spanning multiple periods. Do not over interpret these general statistics.
      .row.justify-between
        passthrough-chart(
          :labels="labels",
          :programmes="data",
          :comments="comments"
        )
      table.table.table-hover.mt-4
        thead
          tr
            td Programme
            td.text-end(v-for="label in labels.skip(1)") {{ label.replace(/^20(\d\d)\/20(\d\d)/g, "$1/$2") }}
        tbody
          tr(
            v-for="{ label: programmme, data, delta } in data",
            :class="{ 'bg-warning-30': EDITI.includes(programmme) && title !== 'EDIT-I' }"
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
    // ready: false,
    // assessment_kind: undefined,
    grade: 1,
    study_period: 1,
    debounce: 0,
    charts: [],
    show_hst: false,
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
    grade() {
      this.reload();
    },
    study_period() {
      this.reload();
    },
  },

  methods: {
    reload() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load();
      }, 500);
    },
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
      this.comments = [
        {
          index: "2020/2021",
          comment: "COVID-19",
          color: "rgba(91, 142, 125, 0.3)",
        },
      ];

      const query = {
        start_period: this.study_period,
        end_period: this.study_period,
        assessment_kind: "Tentamen",
      };
      if (this.assesment_kind !== undefined) {
        query.assessment_kind = this.assesment_kind;
      }
      if (this.grade !== undefined) {
        query.grade = this.grade;
      }
      if (this.until_period !== undefined) {
        query.until_period = this.until_period;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "TK",
          },
        });

        res.data = res.data.map((e) => {
          console.log(e);
          const data = e.data.map((e) => {
            console.log(e);
            if (e === null) {
              return e;
            }

            return this.show_hst ? e.hst : e.result;
          });
          return {
            label: e.label,
            data,
            delta: this.calc_delta(data),
          };
        });

        this.charts.push({
          title: "Civilingenjör",
          data: res.data,
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

        res.data = res.data.map((e) => {
          console.log(e);
          const data = e.data.map((e) => {
            console.log(e);
            if (e === null) {
              return e;
            }

            return this.show_hst ? e.hst : e.result;
          });
          return {
            label: e.label,
            data,
            delta: this.calc_delta(data),
          };
        });

        this.charts.push({
          title: "Högskoleingenjör",
          data: res.data,
          labels: res.labels,
        });
      }

      // {
      //   let res = await Http.get(`passthrough/category`, {
      //     query: {
      //       ...query,
      //       programme_category: "MP",
      //     },
      //   });

      //   res.data = res.data.map((e) => {
      //     console.log(e);
      //     const data = e.data.map((e) => {
      //       console.log(e);
      //       if (e === null) {
      //         return e;
      //       }

      //       return this.show_hst ? e.hst : e.result;
      //     });
      //     return {
      //       label: e.label,
      //       data,
      //       delta: this.calc_delta(data),
      //     };
      //   });

      //   this.charts.push({
      //     title: "Master",
      //     data: res.data,
      //     labels: res.labels,
      //   });
      // }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programmes: JSON.stringify(this.EDITI),
          },
        });

        res.data = res.data.map((e) => {
          console.log(e);
          const data = e.data.map((e) => {
            console.log(e);
            if (e === null) {
              return e;
            }

            return this.show_hst ? e.hst : e.result;
          });
          return {
            label: e.label,
            data,
            delta: this.calc_delta(data),
          };
        });

        this.charts.push({
          title: "EDIT-I",
          data: res.data,
          labels: res.labels,
        });
      }

      // {
      //   let res = await Http.get(`passthrough/category`, {
      //     query: {
      //       ...query,
      //       programmes: JSON.stringify(["TAFFS", "TSILO", "TSJKL", "SBVII"]),
      //     },
      //   });

      //   res.data = res.data.map((e) => {
      //     console.log(e);
      //     const data = e.data.map((e) => {
      //       console.log(e);
      //       if (e === null) {
      //         return e;
      //       }

      //       return this.show_hst ? e.hst : e.result;
      //     });
      //     return {
      //       label: e.label,
      //       data,
      //       delta: this.calc_delta(data),
      //     };
      //   });

      //   this.charts.push({
      //     title: "Övriga",
      //     data: res.data,
      //     labels: res.labels,
      //   });
      // }

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
