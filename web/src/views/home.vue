<template lang="pug">
.row
  .col-6.justify-content-start
    Brand
  //- .col-5
  //-   h1.font-header.fw-bold.text-text News
  //-   router-link(:to="{ name: 'reports/course-impressions' }")
  //-     .py-2 5 days ago
  //-     .d-flex.align-items-center
  //-       h3.font-header.text-text Report: Course impressions
  //-       .badge.fs-6.text-white.bg-accent.mx-2 Unread
  //-     p.pb-3
  //-       span Find out how which students are most satisfied with their courses, how your programme compares to others and much more in this report on what 8 years of course surveys says!
  //-   router-link(:to="{ name: 'reports/course-impressions' }")
  //-     .py-2 2 weeks ago
  //-     .d-flex.align-items-center
  //-       h3.font-header.text-text Hardest courses
  //-       .badge.fs-6.text-white.bg-accent.mx-2 Unread
  //-     p.pb-3
  //-       span Find out how which students are most satisfied with their courses, how your programme compares to others and much more in this report on what 8 years of course surveys says!
</template>

<script>
//import Http from "../plugins/http";
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.news {
}
</style>
