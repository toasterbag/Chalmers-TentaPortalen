<template lang="pug">
.flex.justify-content-around(v-if="feedback.isEmpty()")
  .fs-2.fw-light There is no feedback

.row.justify-content-around(v-else)
  .row(v-for="entry in feedback")
    .col-md-9.col-lg-7.flex.align-items-center.justify-center.border {{ entry }}
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "Exams",
  data: () => ({
    ready: false,

    feedback: [],
  }),
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.feedback = await Http.get("feedback");
    },
  },
};
</script>

<style lang="scss" scoped>
embed {
  width: 100%;
  height: 90vh;
}
</style>
