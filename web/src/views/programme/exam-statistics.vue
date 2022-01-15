<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-center
    .col-12
      exam-bar-graph(
        :exams="statistics",
        :stacked="true",
        :percent-mode="true",
        unit="%"
      )
  .row.justify-content-center.tenta-table.p-md-5
    .col-12
      .row.header
        .col-4 Date
        .col-2 U
        .col-2 3
        .col-2 4
        .col-2 5

      .row(v-for="year in statistics", :key="year.academic_year")
        .col-4 {{ year.academic_year }}
        .col-2(:class="{ 'text-accent': year.failed > 50 }") {{ year.failed }}%
        .col-2 {{ year.three }}%
        .col-2 {{ year.four }}%
        .col-2 {{ year.five }}%
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "course",
  data: () => ({
    ready: false,

    name: undefined,
    code: undefined,
    owner: undefined,
    statistics: [],
  }),
  watch: {
    $route() {
      this.loadStatistics();
    },
  },
  created() {
    this.loadStatistics();
  },
  methods: {
    async loadStatistics() {
      const res = await Http.get(`programme/${this.$route.params.code}/exams`);
      this.statistics = res.map((data) => {
        data.date = data.academic_year;
        data.percent = {};

        const percentages = [data.failed, data.three, data.four, data.five].map(
          (e) => e.div(data.total).mul(100)
        );
        const [failed, three, four, five] = Math.roundToTarget(
          percentages,
          100
        );

        data.failed = failed;
        data.three = three;
        data.four = four;
        data.five = five;
        return data;
      });

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
