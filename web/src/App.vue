<template lang="pug">
.app(theme="light")
  sp-alerts
  .row.justify-content-center
    .col-md-10
      .desktop-only
        Header
      .mobile-only
        MobileHeader

  .row
    .col-2.desktop-only
      .sticky-top.m-4(style="margin-top: 2rem")
        teleport-target(name="sidebar-left")
    .col-12.col-sm-8.px-4
      transition(name="fade", mode="out-in", :key="$router.fullPath")
        router-view.view
    .col-2.desktop-only
      .sticky-top.m-4(style="margin-top: 2rem")
        teleport-target(name="sidebar-right")

  sp-footer
  dialog-portal
</template>

<script>
export default {
  name: "App",
  async created() {
    const isDesktop =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--is-desktop",
      ) === "true";
    console.log("desktop", isDesktop);
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
@import "./styles.scss";
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

html {
  width: 100vw;
  overflow-x: hidden;
  min-height: var(--screen-height);
  box-sizing: border-box;

  background-color: var(--sp-background);
}

body {
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  background-color: var(--sp-background);
  font-family: "Nunito";

  .view {
    padding-bottom: 3rem;
    min-height: 65vh;
  }
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
