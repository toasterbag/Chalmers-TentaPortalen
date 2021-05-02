<template lang="pug">
.mb-3.relative.sp-combobox(@keydown="onKeydown")
  label.form-label(for="code") {{ label }}
    div(v-if="multi")
      .badge.badge-lg.bg-primary.align-items-center.me-2(
        v-for="(item, index) in value"
      )
        span.pe-2 {{ item }}
        i.fa.fa-times(@click="remove(index)")
  .input-group
    input#code.flex-fill.form-control(
      v-model="search",
      @input="update_suggestions",
      @focus="update_suggestions",
      @blur="hide_suggestions"
    )
    .btn.btn-outline-secondary.bg-accent.text-white(
      type="button",
      @click="clear"
    ) Clear
  .form-text {{ caption }}
  .suggestions(:style="{ height: maxHeight ? `${maxHeight}px` : 'unset' }")
    ul.list-group.suggestions
      li.list-group-item.link(
        v-for="(item, index) in displaySuggestion",
        @click="onSelect(item)",
        :class="{ selected: selected == index }"
      )
        slot(
          v-if="$scopedSlots['suggestions:item']",
          name="suggestions:item",
          v-bind:item="item"
        )
        span(v-else-if="itemKey") {{ item[itemKey] }}
        span(v-else) {{ item }}

</div>
</template>

<script>
export default {
  name: "sp-combobox",
  props: {
    value: {
      required: false,
    },
    label: {
      required: true,
    },
    caption: {
      default: "",
    },
    multi: {
      default: false,
    },
    suggestions: {
      default: () => [],
    },
    maxHeight: {
      required: false,
    },
    itemKey: {
      required: false,
    },
  },
  data: () => ({
    search: "",
    hide_selected: true,
    selected: undefined,
    update_timer: undefined,
  }),
  computed: {
    displaySuggestion() {
      if (this.hide_selected) {
        return [];
      }
      return this.multi
        ? this.suggestions.without(this.value)
        : this.suggestions;
    },
  },
  mounted() {
    if (!this.multi) {
      if (Array.isArray(this.value)) {
        this.search = this.value[0] ?? "";
      } else {
        this.search = this.value ?? "";
      }
    }
  },

  methods: {
    onSelect(item) {
      let key = item;
      if (this.itemKey) {
        key = item[this.itemKey];
      }
      if (this.multi) {
        this.search = "";
        this.$emit("input", [...this.value, item]);
      } else {
        this.search = key;
        this.$emit("input", [item]);
      }
    },
    remove(index) {
      this.$emit("input", [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1),
      ]);
    },
    clear() {
      this.search = "";
      this.$emit("input", []);
    },
    onKeydown(e) {
      if (e.key == "Enter") {
        if (this.selected == undefined && !this.displaySuggestion.isEmpty()) {
          this.onSelect(this.displaySuggestion[0]);
        } else {
          this.onSelect(this.displaySuggestion[this.selected]);
        }
      }
    },
    update_suggestions() {
      clearTimeout(this.update_timer);
      const update_fn = () => {
        this.$emit("update:search-input", this.search);
        this.hide_selected = false;
      };
      this.update_timer = setTimeout(update_fn, 300);
    },
    hide_suggestions() {
      setTimeout(() => {
        this.hide_selected = true;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.sp-combobox {
  .suggestions {
    position: relative;

    ul {
      z-index: 1000;
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
  .badges {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>
