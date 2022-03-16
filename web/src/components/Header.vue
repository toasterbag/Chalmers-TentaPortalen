<template lang="pug">
.navbar.navbar-expand-lg.navbar-light
  .container-fluid
    .collapse.navbar-collapse
      .navbar-nav
        .nav-item
          router-link.nav-link(:to="{ name: 'home' }") Home
        .nav-item
          router-link.nav-link(:to="{ name: 'faq' }") FAQ
        .nav-item
          .dropdown
            a.nav-link Rankings
              .fa.fa-caret-down.ps-2
            ul.dropdown-menu
              li
                router-link.dropdown-item(:to="{ name: 'course-search' }") Course rankings
              li
                router-link.dropdown-item(:to="{ name: 'programme-search' }") Programme rankings
        //.nav-item
        //  router-link.nav-link(:to="{ name: 'quick-facts' }") Fun facts
        .nav-item
          router-link.nav-link(:to="{ name: 'passrate-by-period' }") Passrate by exam period
        .nav-item.feature--analytics
          router-link.nav-link(:to="{ name: 'analytics' }") Analytics
    //- This is the items on the right
    .nav-item(:style="{ width: '500px' }")
      SearchBarSmall
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
.navbar {
  height: 6rem;

  .dropdown {
    position: relative;

    &:hover {
      .dropdown-menu {
        display: block;
      }
    }
  }
}
</style>
