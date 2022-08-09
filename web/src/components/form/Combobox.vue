<template lang="pug">
.mb-3.relative
  .font-bold {{ label }}
  .h-10.flex.overflow-hidden.rounded
    input.flex-grow.h-full.p-2.bg-base-200(
      v-model="search",
      @input="updateSuggestions",
      @focus="focused = true",
      @blur="onBlur",
      class="focus:outline-none"
    )
    .bg-accent.text-white.uppercase.px-2.h-full.flex.justify-center.items-center.font-bold.cursor-pointer(
      @click="clear",
      class="hover:bg-accent-focus"
    ) Clear
  .form-text
    slot(name="caption")
  .absolute.w-full.z-popup(v-if="focused")
    .bg-base-200.mt-2.shadow
      .p-2.cursor-pointer(
        v-for="(item, index) in suggestions",
        @click="onSelect(item)",
        class="hover:bg-gray-400/25",
        :class="{ selected: selected == index }"
      )
        slot(
          v-if="$slots['suggestions:item']",
          name="suggestions:item",
          v-bind:item="item"
        )
        span(v-else-if="displayKey !== undefined") {{ item[displayKey] }}
        span(v-else) {{ item }}
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Combobox",
  props: {
    modelValue: {
      required: false,
    },
    label: {
      required: true,
    },
    suggestions: {
      default: () => [],
    },
    displayKey: {
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const focused = ref(false);
    const search = ref(props.modelValue ?? "");
    const selected = ref(null);

    let updateTimer = setTimeout(() => {}, 0);
    const updateSuggestions = () => {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(() => emit("autocomplete", search.value), 200);
    };

    const clear = () => {
      search.value = "";
      emit("autocomplete", search.value);
      emit("update:modelValue", "");
    };

    const onSelect = (item: any) => {
      emit("update:modelValue", item);
      search.value = props.displayKey ? item[props.displayKey] : item;
    };

    const onBlur = () => {
      setTimeout(() => {
        focused.value = false;
      }, 300);
    };

    return {
      search,
      focused,
      selected,
      emit,
      updateSuggestions,
      onSelect,
      onBlur,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
.suggestions {
  position: relative;

  ul {
    z-index: var(--z-dropdown);
    top: 0;
    position: absolute;
    width: 100%;
    background: var(--bg-card);

    li:hover,
    li.active {
      cursor: pointer;
      //background: var(--bg-card-raised);
    }
  }
}
</style>
