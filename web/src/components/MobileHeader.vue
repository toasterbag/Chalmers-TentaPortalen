<template lang="pug">
.py-4.px-3.d-flex.justify-content-between.align-items-center
  .menu-icon.clickable(
    :class="{ hidden: searchBarFocused }",
    @click="menuIsOpen = true"
  )
    .fa.fa-bars.fa-lg
  SearchBarSmall(
    @focus="searchBarFocused = true",
    @blur="searchBarFocused = false"
  )

  .sidebar-container(:class="{ open: menuIsOpen }")
    .outside(@click.prevent.stop="menuIsOpen = false")
    .sidebar.p-2(ref="sidebar")
      .fs-6.text-text
        .py-3
          Brand
        //- .p-2
        //-   .fa-solid.fs-1.fa-xmark
        .py-1.h-fill(v-for="{ title, location, children, icon } in links")
          router-link.py-2(v-if="location !== undefined", :to="location")
            .fa-solid(
              :class="icon",
              :style="{ width: '3rem', textAlign: 'center' }"
            )
            span {{ title }}
          div(v-else)
            div
              .fa-solid(
                :class="icon",
                :style="{ width: '3rem', textAlign: 'center' }"
              )
              span.fw-bold {{ title }}
            .px-3.fw-normal
              .py-2(v-for="{ title, location, icon } in children")
                router-link(:to="location")
                  .fa-solid(
                    :class="icon",
                    :style="{ width: '3rem', textAlign: 'center' }"
                  )
                  span {{ title }}

      div(:style="{ position: 'absolute', left: '1rem', bottom: '1rem' }")
        router-link(:to="{ name: 'feedback' }") Leave feedback
</template>

<script>
export default {
  name: "MobileHeader",
  data: () => ({
    searchBarFocused: false,
    menuIsOpen: false,
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
      },
    ],
    dragStart: undefined,
    dragY: undefined,
  }),
  beforeRouteEnter() {
    this.menuIsOpen = false;
  },
  mounted() {
    document.addEventListener("pointerdown", this.handleGestureStart, true);
    document.addEventListener("pointermove", this.handleGestureMove, true);
    document.addEventListener("pointerup", this.handleGestureEnd, true);
    document.addEventListener("pointercancel", this.handleGestureEnd, true);
  },
  watch: {
    $route() {
      this.menuIsOpen = false;
    },
  },
  methods: {
    handleGestureStart(e) {
      this.dragStart = e.x;
      this.dragY = e.y;
    },
    handleGestureMove(e) {
      const swipeZone = document.body.clientHeight * 0.3;
      if (e.y < this.dragY + swipeZone || e.y > this.dragY - swipeZone) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      return true;
    },
    handleGestureEnd(e) {
      if (this.dragStart) {
        const minDrag = document.body.clientWidth * 0.3;
        if (this.menuIsOpen) {
          // Gesture for close
          if (this.dragStart - e.x > minDrag) {
            this.menuIsOpen = false;
          }
          // Gesture for open
        } else {
          if (e.x - this.dragStart > minDrag) {
            this.menuIsOpen = true;
          }
        }
        e.preventDefault();
        e.stopPropagation();
      }
      this.dragStart = undefined;
    },
  },
};
</script>

<style lang="scss">
.menu-icon {
  width: 42px;
  transition: 200ms ease 0ms;

  &.hidden {
    width: 0;
    opacity: 0;
  }
}

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: var(--z-sidebar);
  transition: 0.3s ease;
  pointer-events: none;

  .sidebar {
    position: absolute;
    transition: 0.3s ease;
    height: 100%;
    width: 80%;
    top: 0;
    left: -80%;
    background: var(--sp-background);
    background: var(--sp-white);

    a {
      display: block;
      width: 100%;
      border-radius: 6px;
      color: var(--sp-text-muted);

      &:hover {
        background-color: rgba(100, 100, 100, 0.2);
      }

      &.router-link-exact-active {
        color: var(--sp-primary);
        background-color: rgba(60, 60, 60, 0.1);
      }
    }
  }

  .outside {
    position: absolute;
    transition: 0.3s ease;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  &.open {
    pointer-events: all;
    .sidebar {
      left: 0;
    }
    .outside {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}

@keyframes hide {
  0% {
    transform: scaleX(1);
  }

  99% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(0);
    display: none;
  }
}

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
