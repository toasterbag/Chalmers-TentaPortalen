<template lang="pug">
.wrapper(theme="light")
  sp-alerts
  .container
    .navbar.navbar-expand-lg.navbar-light
      .container-fluid
        //- This is the items on the left
        .collapse.navbar-collapse
          .navbar-nav
            .nav-item
              router-link.nav-link(:to="{ name: 'home' }") Home
            .nav-item
              router-link.nav-link(:to="{ name: 'faq' }") FAQ
            .nav-item
              router-link.nav-link(:to="{ name: 'course-search' }") Course rankings
            .nav-item
              router-link.nav-link(:to="{ name: 'programme-search' }") Programme rankings
            //.nav-item
            //  router-link.nav-link(:to="{ name: 'quick-facts' }") Fun facts
            .nav-item
              router-link.nav-link(:to="{ name: 'passrate-by-period' }") Passrate by exam period
            .nav-item.feature--analytics
              router-link.nav-link(:to="{ name: 'analytics' }") Analytics
        //- This is the items on the right
        .nav-item 

    .pb-3(v-if="route_with_searchbar")
      search-bar

    transition(name="fade", mode="out-in")
      router-view.view
  sp-footer

  dialog-portal
</template>

<script>
import Http from "./plugins/http";

export default {
  name: "App",
  async created() {
    let last_reset = localStorage.getItem("time");
    if (last_reset != new Date().getDay()) {
      const rand = new TextEncoder().encode(Math.random().toString());
      const buffer = await crypto.subtle.digest("SHA-256", rand);
      const hashArray = Array.from(new Uint8Array(buffer));
      const token = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      localStorage.setItem("token", token);
      localStorage.setItem("time", new Date().getDay());
    }
    Http.log("arrive");
  },
  computed: {
    route_with_searchbar() {
      return [
        "home",
        "course/exam-statistics",
        "course/materials",
        "course/survey",
      ].includes(this.$route.name);
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@100;300;400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600;700&display=swap");
@import "~@fortawesome/fontawesome-free/css/all.css";

:root [theme="light"] {
  @include spread-map($theme-map-light);
}
:root [theme="light"] {
  @include spread-map($theme-map-dark);
}

html {
  height: 100vh;
  box-sizing: border-box;

  background-color: var(--sp-background);
}

body,
.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: var(--sp-background);
  color: rgba(0, 0, 0, 0.85);
  font-family: "Nunito";

  .view {
    padding-bottom: 3rem;
  }
}

.wrapper {
  padding-bottom: var(--footer-height);
}

.feature--analytics {
  display: none !important;
}

.clickable {
  cursor: pointer;
}

@media (max-width: 576px) {
  .desktop-only {
    display: none;
  }
}

@media (min-width: 576px) {
  .mobile-only {
    display: none;
  }
}

.btn {
  color: var(--sp-background);

  &:hover {
    color: var(--sp-background);
  }
}

.text {
  color: var(--sp-text);
}

.text-white {
  color: var(--sp-background) !important;
}

.text-primary {
  color: var(--sp-primary) !important;
}

.text-accent {
  color: var(--sp-accent);
}

.font-brand {
  font-family: "Montserrat", sans-serif;
}

.bg-primary {
  background-color: var(--sp-primary) !important;
}

.bg-accent {
  background-color: var(--sp-accent);
}

.bg-warning {
  background-color: var(--sp-warning) !important;
}

.bg-error {
  background-color: var(--sp-error);
}

a,
.link {
  cursor: pointer;
  color: var(--sp-text);
  text-decoration: none;

  &:hover {
    color: var(--sp-text);
  }

  &.router-link-exact-active {
    //color: var(--sp-accent);
  }
}

.bold {
  font-weight: 700;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.tenta-table {
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  width: 100%;

  a {
    color: inherit;
  }

  .row.header {
    font-weight: 700;
    padding-bottom: 4px;
    margin-bottom: 8px;
    border-bottom: 2px solid #ddd;
  }

  .row:not(.header) {
    padding-top: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #ddd;

    &:hover {
      background-color: var(--sp-yellow);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;

  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
