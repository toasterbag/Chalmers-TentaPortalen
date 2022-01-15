<template lang="pug">
.tabs
  .tab-row.align-items-center
    router-link.tab(
      v-for="{ title, route, badge = undefined } in entries",
      :to="{ name: route }",
      :key="route"
    )
      span.fw-bold.uppercase {{ title }}
        span.badge.bg-accent.ms-1(v-if="badge") {{ badge }}
</template>

<script>
export default {
  name: "tabs",
  props: {
    entries: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;

  .tab-row {
    display: flex;
    overflow-wrap: normal;
    flex-wrap: no-wrap;

    .tab {
      padding: 0.5rem 1rem;
      display: block;
      overflow-wrap: normal;

      &:hover {
        color: var(--sp-primary);
      }
    }
  }

  .router-link-exact-active {
    color: var(--sp-primary);
    border-bottom: 2px solid var(--sp-primary);
  }
}

@media (max-width: 575.98px) {
  .tabs {
    display: block;
    .tab-row {
      min-width: 100px;
      padding: 1rem 0;
      overflow-x: auto;
    }
  }
}
</style>
