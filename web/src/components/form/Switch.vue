<template lang="pug">
.relative.flex.items-center.justify-between.text-xl.cursor-pointer(
  @click="toggle"
)
  .pr-2(v-if="label.length > 0") {{ label }}
  .rounded-full.w-14.h-7.border-2.border-primary.relative(
    :class="{ 'bg-primary': modelValue, 'bg-base-200': !modelValue, grayscale: disabled }"
  )
    .absolute.h-5.w-5.rounded-full.transition.bg-primary(
      :style="thumbStyle",
      :class="{ 'bg-white': modelValue, 'bg-primary': !modelValue }"
    )
      //- .fa.fa-check.center.text-sm
</template>

<script lang="ts">
import { useTheme } from "@plugins/theme";
import { computed } from "@vue/reactivity";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RetroSwitch",
  props: {
    modelValue: {
      required: true,
      type: Boolean,
    },
    color: {
      required: false,
      default: undefined,
    },
    label: {
      required: false,
      default: "",
    },
    small: {
      required: false,
      default: true,
    },
    icon: {
      required: false,
      default: false,
    },
    disabled: {
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const toggle = () => {
      if (props.disabled) return;
      const val = !props.modelValue;
      emit("update:modelValue", val);
      emit("input", val);
    };
    const thumbStyle = computed(() => ({
      top: "50%",
      left: "2px",
      transform: [
        `translateY(-50%)`,
        `translateX(${props.modelValue ? "calc(2rem - 4px)" : 0})`,
        `scale(${props.modelValue ? 1 : 0.8})`,
      ].join(" "),
    }));
    return { toggle, thumbStyle };
  },
});
</script>

<style lang="scss" scoped></style>
