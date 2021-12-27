<template lang="pug">
.brand.d-flex.align-self-center.justify-content-center
  .font-brand
    .name CoursePortal
    .slogan Tentō, ergo sum
</template>

<script>
//import Http from "../plugins/http";
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.brand {
  height: 100%;
  padding-top: 5rem;
  user-select: none;
  color: var(--sp-text);

  .name {
    font-size: 5rem;
  }

  .slogan {
    font-size: 2rem;
  }
}
</style>
