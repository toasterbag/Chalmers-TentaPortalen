<template lang="pug">
.mb-3.relative.sp-combobox
  label.form-label(for="code") {{ label }}
  .input-group
    input#code.flex-fill.form-control(
      v-model="search",
      @input="updateSuggestions",
      @focus="focused = true",
      @blur="onBlur"
    )
    .btn.btn-outline-secondary.bg-accent.text-white(
      type="button",
      @click="clear"
    ) Clear
  .form-text
    slot(name="caption")
  .suggestions(v-if="focused")
    ul.list-group
      li.list-group-item.link(
        v-for="(item, index) in suggestions",
        @click="onSelect(item)",
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
import { defineComponent, ref } from "vue"

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

    let updateTimer = setTimeout(() => { }, 0);
    const updateSuggestions = () => {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(() => emit("autocomplete", search.value), 200);
    }

    const clear = () => {
      search.value = "";
      emit("autocomplete", search.value);
      emit("update:modelValue", "")
    }

    const onSelect = (item: any) => {
      emit("update:modelValue", item)
      search.value = props.displayKey ? item[props.displayKey] : item;
    }

    const onBlur = () => {
      setTimeout(() => {
        focused.value = false;
      }, 300)
    }

    return {
      search,
      focused,
      selected,
      emit,
      updateSuggestions,
      onSelect,
      onBlur,
      clear
    }
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
