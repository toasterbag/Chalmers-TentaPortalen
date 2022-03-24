<template lang="pug">
component(:is="report_component")
</template>

<script>
const context = require.context("./", true, /\.vue$/);
const components = context
  .keys()
  .map(context)
  .reduce((map, next) => {
    if (next.default) map.set(next.default.slug, next.default);
    return map;
  }, new Map());

export default {
  name: "Reports",
  data: () => ({
    reports: components,
  }),
  computed: {
    report_component() {
      return this.reports.get(this.$route.params.slug);
    },
  },
};
</script>

<style lang="scss" scoped></style>
