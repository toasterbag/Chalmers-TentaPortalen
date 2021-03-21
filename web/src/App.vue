<template lang="pug">
.wrapper
  .container
    .navbar.navbar-expand-lg.navbar-light
      .container-fluid
        .collapse.navbar-collapse
          .navbar-nav
            .nav-item
              router-link.nav-link(:to="{ name: 'home' }") Home
            .nav-item.feature--exam
              router-link.nav-link(:to="{ name: 'exams' }") Upload Exam
    search-bar

    transition(name="fade", mode="out-in")
      router-view.view
  footer
    .row
      .col-12.col-md-8
        .text A project by DNS (Datateknologsektionens nämnd för studier)
        .text Contact us at {{ 'dns' }}@dtek.se
      .col-12.col-md-4.text-end
        .pa-2
          a(
            href="https://github.com/toasterbag/course-portal",
            target="_blank"
          ) Code on Github
        .pa-2
          a(href="https://github.com/dtekcth/plugg", target="_blank") Course repository
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
};
</script>

<style lang="scss">
@import url("assets/mdi.min.css");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@100;300;400;700&display=swap");

html {
  height: 100vh;
  box-sizing: border-box;

  --link-color: #b3d368;
  background-color: #f0efee;
}

body,
.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #f0efee;
}

.wrapper {
  padding-bottom: 80px;
}

footer {
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0px;
  background-color: #e7e7e7;
  padding: 1rem;
  box-sizing: border-box;
}

.feature--exam {
  display: none !important;
}
.text {
  color: #4e5358;
}

.text-white {
  color: white;
}

.bg-link {
  background-color: var(--link-color);
}

a,
.link {
  cursor: pointer;
  color: #4e5358;
  text-decoration: none !important;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.tenta-table {
  font-weight: 400;
  color: #4e5358;
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
      background-color: var(--link-color);
    }
  }
}

.text-pink {
  color: hsl(339, 80%, 41%);
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
