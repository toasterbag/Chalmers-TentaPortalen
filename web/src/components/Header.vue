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
      SearchBar
    .nav-item(v-if="!isSignedIn")
      router-link(:to="{ name: 'SignIn' }")
        .btn Sign in
    .nav-item(v-else)
      .btn.bg-accent Sign out
    //- .nav-item.pe-3
    //-   router-link(:to="{ name: 'home' }") Sign in
    //- .nav-item
    //-   router-link(:to="{ name: 'home' }")
    //-     .btn.bg-primary.text-white Sign up
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useAPI } from "../plugins/api";

export default defineComponent({
  name: "Header",
  setup() {
    const { isSignedIn } = storeToRefs(useAPI());

    return {
      isSignedIn,
      links: [
        {
          title: "Home",
          icon: "fa-home",
          location: { name: "Home" },
        },
        {
          title: "Passrate by exam period",
          icon: "fa-chart-line",
          location: { name: "PassrateByPeriod" },
        },

        {
          title: "Rankings",
          icon: "fa-chart-bar",
          children: [
            {
              title: "Course impressions",
              location: { name: "CourseImpressionRankings" },
            },
            {
              title: "Course performance",
              location: { name: "CoursePerformanceRankings" }
            },
            {
              title: "Programmes",
              location: { name: "ProgrammeRankings" },
            },
          ],
        },

        {
          title: "FAQ",
          icon: "fa-question",
          location: { name: "FAQ" },
          // children: [
          //   {
          //     title: "Glossary",
          //     icon: "fa-book",
          //     location: { name: "glossary" },
          //   },
          // ],
        },
      ],
    }
  },
});
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
