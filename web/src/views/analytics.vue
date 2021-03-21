<template lang="pug">
.container
  div
    .row.pa-3
      .col-6
        h3.capitalize Visitors last thirty days
    .row.justify-content-center
      .col-12
        visitor-bar-graph(:visitors="visitors")
</template>

<script>
import Http from "../plugins/http";

export default {
  name: "analytics",
  data: () => ({
    ready: false,
    visitors: [],
  }),

  async created() {
    this.visitors = await Http.get(`metrics/visitors`);
  },
};
</script>

<style lang="scss" scoped></style>
