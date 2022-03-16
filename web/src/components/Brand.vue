<template lang="pug">
.row
  .col-12
    .brand.d-flex.align-self-center.justify-content-center
      .font-brand
        .name CoursePortal
        .slogan Tentō, ergo sum
</template>

<script>
//import Http from "../plugins/http";
export default {
  name: "Brand",
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.brand {
  user-select: none;
  color: var(--sp-text);

  .name {
    font-size: 2rem;
  }

  .slogan {
    font-size: 1rem;
  }

  @include sm {
    .name {
      margin-top: 4rem;
      font-size: 6rem;
    }

    .slogan {
      font-size: 2rem;
    }
  }
}
</style>
