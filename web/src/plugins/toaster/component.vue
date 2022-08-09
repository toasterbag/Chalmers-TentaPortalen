<template lang="pug">
.toaster
  .message.text-white(
    v-for="([id, toast], index) in queue",
    :key="id",
    :style="{ top: `${index * 64 + 12}px`, backgroundColor: toast.color ?? 'var(--p)' }",
    :class="{ exit: toast.exiting }"
  )
    .fa.pr-2(:class="[toast.icon]")
    span.fw-bold {{ toast.content }}
</template>

<script lang="ts">
import { useToastStore } from "./index";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Toaster",
  setup() {
    const store = useToastStore();
    const queue = computed(() => Array.from(store.toasts.entries()).reverse());
    return {
      queue,
    };
  },
});
</script>

<style lang="scss" scoped>
.toaster {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 320px;
  z-index: var(--z-toaster);

  .message {
    border-radius: 2px;
    position: absolute;
    right: 12px;
    transition: all 0.3s;
    width: 320px;
    padding: 16px;
    // background: var(--vv-primary);
    animation: slide-in;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    vertical-align: middle;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    .v-icon {
      padding: 0px 8px 2px 0px;
      color: #fff;
      vertical-align: middle;
    }

    .title {
      font-size: 16px !important;
      color: #fff;
    }

    .content {
      vertical-align: middle;

      color: #fff;
      //color: rgba(255, 255, 255, 0.8);
    }
  }
}

.exit {
  opacity: 0;
  animation: exit ease;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes exit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    right: 0px;
    display: none;
  }
}

@keyframes slide-in {
  0% {
    top: -100px;
  }
  100% {
    top: 12px;
  }
}
</style>
