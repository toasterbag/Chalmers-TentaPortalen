<template lang="pug">
.wrapper(theme="light")
  sp-alerts
  .row.justify-content-center
    .col-10
      Header

  .row
    .col-2
      .sticky-top(style="margin-top: 60%")
        teleport-target(name="sidebar-left")
    .col-8
      transition(name="fade", mode="out-in", :key="$router.fullPath")
        router-view.view
    .col-2
      .sticky-top(style="margin-top: 60%")
        teleport-target(name="sidebar-right")

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

/*
  1. Use a more-intuitive box-sizing model.
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html,
body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img,
picture,
video,
canvas {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input,
button,
textarea,
select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root,
#__next {
  isolation: isolate;
}

@import "./styles.scss";

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

.text-size-sm {
  font-size: 0.75rem;
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
