<template lang="pug">
.py-4.px-3.d-flex.justify-content-between.align-items-center
  .menu-icon.clickable(
    :class="{ hidden: searchBarFocused }",
    @click="openMenu"
  )
    .fa.fa-bars.fa-lg
  SearchBar(
    @focus="searchBarFocused = true",
    @blur="searchBarFocused = false"
  )

  .sidebar-container(:class="{ open: menuIsOpen }")
    .outside(@click.prevent.stop="closeMenu", :style="overlayStyle")
    .sidebar.p-2(ref="sidebar", :style="sidebarStyle")
      .fs-6.text-text
        .py-3.ps-3
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

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { headerLinks } from "../router";

const INSTANT = "0";
const EASE = ".3s";

function isTouchEvent(obj: any): obj is TouchEvent {
  return "targetTouches" in obj;
}

export default defineComponent({
  name: "MobileHeader",
  setup() {
    const route = useRoute();
    const sidebar: Ref<HTMLElement | undefined> = ref(undefined)
    const searchBarFocused = ref(false);
    const sidebarLeft = ref("-100%");
    const overlayOpacity = ref(0);
    const sidebarTransition = ref(EASE);
    const menuIsOpen = ref(false);
    const dragStart: Ref<number | undefined> = ref(undefined);
    const dragY = ref(0);
    const sidebarWidth = ref(0);

    const sidebarStyle = computed(() => ({ transform: `translateX(${sidebarLeft.value})`, transitionDuration: sidebarTransition.value }))
    const overlayStyle = computed(() => ({
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity.value})`,
    }))

    const openMenu = () => {
      menuIsOpen.value = true;
      sidebarLeft.value = "0";
      sidebarTransition.value = EASE;
      overlayOpacity.value = 0.5;
    }

    const closeMenu = () => {
      menuIsOpen.value = false;
      sidebarLeft.value = "-100%";
      sidebarTransition.value = EASE;
      overlayOpacity.value = 0;
    }

    const handleGestureMove = (e: TouchEvent | MouseEvent) => {
      const x = isTouchEvent(e) ? e.targetTouches[0]?.clientX : e.clientX;
      const y = isTouchEvent(e) ? e.targetTouches[0]?.clientY : e.clientY;
      e.preventDefault();
      e.stopPropagation();

      const swipeZone = document.body.clientHeight * 0.3;
      if (y > dragY.value + swipeZone || y < dragY.value - swipeZone) {
        if (menuIsOpen.value) {
          openMenu();
        } else {
          closeMenu();
        }
        return false;
      }

      const bound = (e: number) => (e).min(sidebarWidth.value).max(0)

      if (menuIsOpen.value) {
        sidebarLeft.value = `-${sidebarWidth.value - bound(x)}px`;
        overlayOpacity.value = (((sidebarWidth.value - bound(x)) / sidebarWidth.value)) * 0.5;
      } else {
        sidebarLeft.value = `-${sidebarWidth.value - bound(x)}px`;
        overlayOpacity.value = (1 - ((sidebarWidth.value - bound(x)) / sidebarWidth.value)) * 0.5;
      }
      return true;
    };

    const handleGestureStart = (e: TouchEvent | MouseEvent) => {
      sidebarTransition.value = INSTANT;
      const x = isTouchEvent(e) ? e.targetTouches[0]?.clientX : e.clientX;
      const y = isTouchEvent(e) ? e.targetTouches[0]?.clientY : e.clientY;

      if (x < document.body.clientWidth * 0.5 || menuIsOpen.value) {
        dragStart.value = x;
        dragY.value = y;
        document.addEventListener("pointermove", handleGestureMove, true);
      }
    };

    const handleGestureEnd = (e: TouchEvent | MouseEvent) => {
      const x = isTouchEvent(e) ? e.targetTouches[0]?.clientX : e.clientX;
      document.removeEventListener("pointermove", handleGestureMove, true);

      sidebarTransition.value = EASE;

      if (dragStart.value) {
        const minDrag = document.body.clientWidth * 0.3;
        if (menuIsOpen.value) {
          // Gesture for close
          if (dragStart.value - x > minDrag) {
            closeMenu();
          }
          // Gesture for open
        } else {
          if (x - dragStart.value > minDrag) {
            openMenu();
          }
        }
        e.preventDefault();
        e.stopPropagation();
      }

      if (menuIsOpen.value) {
        openMenu()
      } else {
        closeMenu();
      }
      dragStart.value = undefined;
    }

    watch(route, () => {
      closeMenu()
    })

    onMounted(() => {
      if (sidebar.value !== undefined) {
        sidebarWidth.value = sidebar.value.clientWidth;
        document.addEventListener("pointerdown", handleGestureStart, true);
        document.addEventListener("pointerup", handleGestureEnd, true);
        document.addEventListener("pointercancel", handleGestureEnd, true);
      } else {
        throw Error("Sidebar not loaded")
      }
    })

    onUnmounted(() => {
      document.removeEventListener("pointerdown", handleGestureStart, true);
      document.removeEventListener("pointerup", handleGestureEnd, true);
      document.removeEventListener("pointercancel", handleGestureEnd, true);
      // document.removeEventListener("pointermove", this.handleGestureMove, true);
    })

    return {
      sidebar,
      searchBarFocused,
      menuIsOpen,
      links: headerLinks,
      sidebarStyle,
      overlayStyle,
      openMenu,
      closeMenu,
    }
  },
});
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
  transition: 0.1s ease-out;
  pointer-events: none;

  .sidebar {
    position: absolute;
    transition: transform ease-out;
    height: 100%;
    width: 80%;
    top: 0;
    // left: -80%;
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
