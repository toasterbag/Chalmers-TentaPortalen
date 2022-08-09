<template lang="pug">
.w-full.h-1.bg-base-300
  .bg-primary.h-full.pending(v-if="pending")
  .bg-primary.h-full.transition(
    v-else,
    :style="{ width: `${(progress ?? 0) * 100}%` }"
  )
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ProgressBar",
  props: {
    progress: {
      required: false,
      type: Number,
    },
    pending: {
      default: false,
      type: Boolean,
    },
  },
  setup() {
    const pendingStart = ref(false);
    onMounted(() => {
      pendingStart.value = true;
    });

    return { pendingStart };
  },
});
</script>

<style lang="scss">
@keyframes indeterminate {
  0% {
    width: 0px;
  }

  100% {
    width: 90%;
  }
}

.pending {
  animation-name: indeterminate;
  animation-duration: 10s;
}
</style>
