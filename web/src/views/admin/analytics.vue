<template lang="pug">
Spinner(v-if="loading")
div(v-else)
  .row.justify-between
    .col-6
      LineChart(:labels="exams_uploaded.labels", :data="exams_uploaded.data")
    .col-6
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "Analytics",
  data: () => ({
    loading: true,
    timer: undefined,
    exams_uploaded: {
      labels: undefined,
      data: undefined,
    },
  }),
  computed: {},
  async created() {
    this.load();
    this.timer = setInterval(async () => {
      this.load();
    }, 60 * 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    async load() {
      const res = await Http.get("analytics/exams");
      this.exams_uploaded.labels = res.upload_metrics.map(([date]) => date);
      this.exams_uploaded.data = [
        {
          label: "Uploads",
          data: res.upload_metrics.map(([, count]) => count),
        },
      ];
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
