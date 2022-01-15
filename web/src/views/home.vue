<template lang="pug">
.row
  .col-6
    .brand.d-flex.align-self-center.justify-content-start
      .font-brand
        .name CoursePortal
        .slogan Tentō, ergo sum
  .col-6.pt-4
    h3 New exam data
    p.pb-3 
      span Study period 2 exams and survey data will be available by February 8th.
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
    font-size: 4rem;
  }

  .slogan {
    font-size: 1rem;
  }
}
</style>
