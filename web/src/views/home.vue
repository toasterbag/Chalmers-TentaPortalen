<template lang="pug">
.row
  .col-12
    .brand.d-flex.align-self-center.justify-content-center
      .font-brand
        .name CoursePortal
        .slogan Tentō, ergo sum
    //- h3 This year so far
    //- p.pb-3
    //-   span See how the current students compare to previous years
    //-   router-link(:to="{ name: 'statistics/this-year-so-far' }") &nbsp;here
</template>

<script>
//import Http from "../plugins/http";
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.brand {
  user-select: none;
  color: var(--sp-text);

  .name {
    margin-top: 4rem;
    font-size: 6rem;
  }

  .slogan {
    font-size: 2rem;
  }
}
</style>
