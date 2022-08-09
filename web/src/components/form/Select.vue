<template lang="pug">
.w-full.relative
  .w-full.retro-input(
    class="focus:outline-none disabled:opacity-75 disabled:select-none",
    :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }",
    type="text",
    :placeholder="focus ? placeholder : ''",
    :value="modelValue",
    :disabled="disabled",
    @click="focus = true"
  ) {{ modelValue ?? "&nbsp;" }}
    .underline.transition.duration-300.w-full.bg-primary.absolute.bottom-0.left-0(
      class="h-[2px]",
      :style="{ transform: `scaleX(${focus ? 1 : 0})` }"
    )
  .absolute.transition-all.pl-3.pointer-events-none(
    :style="labelStyle",
    :class="{ 'text-secondary': activated }"
  ) {{ label }}
  .absolute.pt-2.z-popup.w-full(v-if="focus", ref="selector")
    .relative.rounded.bg-white.absolute.shadow.py-2.w-full
      .p-2.cursor-pointer(
        v-for="value in options",
        class="hover:bg-gray-400/30",
        @click="select(value)"
      ) {{ value }}
</template>

<script lang="ts">
import { onClickOutside } from "@vueuse/core";
import { computed, defineComponent, onMounted, PropType, Ref, ref } from "vue";
export default defineComponent({
  name: "RetroSelect",
  props: {
    modelValue: {
      required: true,
    },
    options: {
      required: true,
      type: Object as PropType<Array<string>>,
    },
    label: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const focus = ref(false);
    const selector: Ref<HTMLElement | undefined> = ref(undefined);
    const activated = computed(
      () =>
        focus.value ||
        props.modelValue !== undefined ||
        props.modelValue !== "",
    );
    const labelStyle = computed(() => ({
      transform: `translateY(${activated.value ? -2.8 : -2.1}rem)`,
      fontSize: `${activated.value ? 0.7 : 1.125}rem`,
    }));

    const select = (value: any) => {
      emit("update:modelValue", value);
      emit("input", value);
      focus.value = false;
    };

    onMounted(() => {
      onClickOutside(selector, () => {
        focus.value = false;
      });
    });
    return { select, focus, activated, labelStyle, selector };
  },
});
</script>
