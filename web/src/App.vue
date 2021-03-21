<template lang="pug">
.container
  search-bar
  transition(name="fade", mode="out-in")
    router-view
  .row.justify-content-center.p-4
    .col-auto.text-center
      .text A project by DNS (Datateknologsektionens nämnd för studier)
      .text Contact us at {{ 'dns' }}@dtek.se
  .row.justify-content-center.p-4
    .col-auto.text-center
      a.m-5(
        href="https://github.com/toasterbag/course-statistics",
        target="_blank"
      ) Code on Github
    .col-auto.text-center
      a.m-5(href="https://github.com/dtekcth/plugg", target="_blank") Course repository
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

body {
  --link-color: #b3d368;
  background-color: #f0efee;
}

.text {
  color: #4e5358;
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
