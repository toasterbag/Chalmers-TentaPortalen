<template lang="pug">
.mb-3.relative
  label.font-bold {{ label }}
  .h-10.flex.overflow-hidden.rounded.bg-base-200
    input.flex-grow.p-2.bg-base-200(
      v-model="search",
      @keydown.stop.prevent="",
      @focus="focused = true",
      @blur="onBlur"
    )
    .bg-accent.text-white.uppercase.px-2.h-full.flex.justify-center.items-center.font-bold.cursor-pointer(
      type="button",
      v-if="clearable",
      @click="clear",
      class="hover:bg-accent-focus"
    ) Clear
  .form-text
    slot(name="comment")
  .absolute.w-full.z-popup(v-if="focused")
    .bg-base-200.mt-2.shadow
      .p-2.cursor-pointer(
        v-for="item in values",
        @click="onSelect(item)",
        class="hover:bg-gray-400/25"
      ) {{ item }}
        //slot(v-bind:item="item")
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
    clearable: {
      default: true,
    },
  },
  setup(props, { emit }) {
    const focused = ref(false);
    const search = ref(props.modelValue ?? "");
    const selected = ref(undefined);

    const onSelect = (item: any) => {
      emit("update:modelValue", item);
      search.value = props.displayKey ? item[props.displayKey] : item;
    };

    const clear = (item: any) => {
      emit("update:modelValue", undefined);
      search.value = undefined;
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
      onSelect,
      onBlur,
      clear,
    };
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
