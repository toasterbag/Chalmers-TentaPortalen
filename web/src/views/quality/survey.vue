<template lang="pug">
Spinner(v-if="!ready")
div(v-else)
  table.table.table-hover.mt-4
    thead
      tr
        td Programme
        td.text-end(v-for="label in labels.skip(1)") {{ label.replace(/^20(\d\d)\/20(\d\d)/g, '$1/$2') }}
    tbody
      tr(v-for="[programmme, years] in survey_by_programme")
        td {{ programmme }}
        td.text-end(v-for="delta in delta.skip(1)")
          span(:class="[`text-${delta.color}`]") {{ delta.prefix }}{{ delta.value }}{{ delta.suffix }}
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "passthrough",
  data: () => ({
    ready: false,
    survey_by_programme: [],
  }),
  created() {
    this.load();
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
      this.survey_by_programme = await Http.get(`survey/per-programme`);

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
