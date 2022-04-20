<template lang="pug">
.mb-3.relative.sp-combobox
  label.form-label(for="code") {{ label }}
  .input-wrapper.d-flex.align-items-center
    input#code.flex-fill.form-control(
      v-model="search",
      @keydown.stop.prevent="",
      @focus="focused = true",
      @blur="onBlur"
    )
  .form-text
    slot(name="comment")
  .suggestions(v-if="focused")
    ul.list-group.suggestions
      li.list-group-item.link(
        v-for="item in values",
        @click="onSelect(item)"
      ) {{ item }}
        //slot(v-bind:item="item")
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "Select",
  props: {
    modelValue: {
      required: false,
    },
    label: {
      required: true,
    },
    values: {
      default: () => [],
    },
    displayKey: {
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const focused = ref(false);
    const search = ref(props.modelValue ?? "");
    const selected = ref(undefined);

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
      onSelect,
      onBlur,
    }
  },
});
</script>

<style lang="scss" scoped>
.sp-combobox {
  .suggestions {
    position: relative;

    ul {
      z-index: var(--z-dropdown);
      top: 0;
      position: absolute;
      width: 100%;

      background: var(--bg-card);

      li:hover {
        background: var(--bg-card-raised);
      }
    }
  }
  .badges {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>
