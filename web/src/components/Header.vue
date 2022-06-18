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
      .btn.bg-accent(@click="signOut") Sign out
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useAPI } from "../plugins/api";
import { headerLinks } from "../router";

export default defineComponent({
  name: "Header",
  setup() {
    const api = useAPI();
    const { isSignedIn } = storeToRefs(api);
    const links = headerLinks;

    return {
      isSignedIn,
      signOut: api.signOut,
      links,
    };
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
