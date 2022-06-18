<template lang="pug">
.app(theme="light")
  .d-flex.flex-column.flexboi
    Alerts
    .row.justify-content-center(ref="headerElement")
      .col-lg-10
        .hide-below-md
          Header
        .hide-above-md
          MobileHeader

    .view.flex-fill
      View
    Footer

  DialogPortal
  Toaster
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useDialog } from "./plugins/dialog";
import { usePlausible } from "./plugins/plausible";
export default defineComponent({
  name: "App",
  setup() {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key == "k") {
        e.preventDefault();
        e.stopPropagation();
        useDialog().open("CommandPalette");
        usePlausible().trackEvent("Command palette");
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", onKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", onKeyDown);
    });

    return {};
  },
});
</script>

<style lang="scss">
@import "./styles.scss";

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

  .view {
    padding-bottom: 3rem;
    // min-height: 75vh;
    transition: height 0.1s ease-out;
  }

  .flexboi {
    min-height: 100vh;
  }
}

.clickable {
  cursor: pointer;
}

.text-size-sm {
  font-size: 0.75rem;
}

.font-brand {
  font-family: "Montserrat", sans-serif;
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
      background-color: var(--sp-overlay);
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
