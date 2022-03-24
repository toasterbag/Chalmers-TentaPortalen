<template lang="pug">
.navbar.navbar-expand-lg.navbar-light
  .container-fluid
    .collapse.navbar-collapse
      .navbar-nav
        .nav-item(v-for="{ title, location, children } in links")
          .dropdown(v-if="children")
            a.nav-link {{ title }}
              .fa.fa-caret-down.ps-2
            ul.dropdown-menu
              li(v-for="{ title, location } in children")
                router-link.dropdown-item(:to="location") {{ title }}

          router-link.nav-link(v-else, :to="location") {{ title }}

    //- This is the items on the right
    .nav-item.pe-3(:style="{ width: '500px' }")
      SearchBarSmall
    //- .nav-item.pe-3
    //-   router-link(:to="{ name: 'home' }") Sign in
    //- .nav-item
    //-   router-link(:to="{ name: 'home' }")
    //-     .btn.bg-primary.text-white Sign up
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    links: [
      {
        title: "Home",
        icon: "fa-home",
        location: { name: "home" },
      },
      {
        title: "Passrate by exam period",
        icon: "fa-chart-line",
        location: { name: "passrate-by-period" },
      },

      {
        title: "Rankings",
        icon: "fa-chart-bar",
        children: [
          {
            title: "Courses",
            location: { name: "course-search" },
          },
          {
            title: "Programmes",
            location: { name: "programme-search" },
          },
        ],
      },

      {
        title: "FAQ",
        icon: "fa-question",
        location: { name: "faq" },
        // children: [
        //   {
        //     title: "Glossary",
        //     icon: "fa-book",
        //     location: { name: "glossary" },
        //   },
        // ],
      },
    ],
  }),
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
