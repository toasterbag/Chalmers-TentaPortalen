<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "Highlight",
  props: {
    selector: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const showOverlay = ref(false);
    const circleEl: Ref<HTMLElement | undefined> = ref(undefined);
    const circleDiameter = ref("200px");
    const circleX = ref("200px");
    const circleY = ref("200px");
    const onMouseEnter = () => {
      showOverlay.value = true;
      document.querySelectorAll(props.selector).forEach((el) => {
        if (el instanceof HTMLElement && circleEl.value) {
          el.style.zIndex = "100002";
          circleEl.value.style.left = `${el.offsetLeft}px`;
          circleEl.value.style.top = `${el.offsetTop}px`;
          circleEl.value.style.width = `${el.clientWidth}px`;
          circleEl.value.style.height = `${el.clientWidth}px`;
          circleEl.value.style.zIndex = `100001`;
        }
      });
    };

    const onMouseLeave = () => {
      showOverlay.value = false;
      document.querySelectorAll(props.selector).forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.zIndex = "";
        }
      });
    };

    return {
      circleEl,
      showOverlay,
      onMouseEnter,
      onMouseLeave,
    };
  },
});
</script>

<template lang="pug">
span.highlight
  .fixed.w-screen.h-screen.pointer-events-none.top-0.left-0(
    class="bg-gray-900/0 z-[100000]",
    v-if="showOverlay"
  )
  .pulser(v-show="showOverlay", ref="circleEl")

  span.underline.text-primary.cursor-pointer(
    @mouseover="onMouseEnter",
    @mouseleave="onMouseLeave"
  )
    slot
</template>

<style scoped>
.pulser {
  position: fixed;
  border-radius: 2000px;
  background: hsl(var(--p));
  animation: Grow 1s ease-out infinite;
}

@keyframes Grow {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(7);
    opacity: 0;
  }
  80% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
