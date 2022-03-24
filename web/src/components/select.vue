<template lang="pug">
.mb-3.relative.sp-combobox
  label.form-label(for="code") {{ label }}
    div(v-if="multi")
      .badge.badge-lg.bg-primary.align-items-center.me-2(
        v-for="(item, index) in value"
      )
        span.pe-2 {{ item }}
        i.fa.fa-times(@click="remove(index)")
  .input-wrapper.d-flex.align-items-center
    input#code.flex-fill.form-control(
      v-model="search",
      @keydown.stop.prevent="",
      @focus="focus = true",
      @blur="delay_blur"
    )
  .form-text {{ caption }}
  .suggestions(v-if="focus")
    ul.list-group.suggestions
      li.list-group-item.link(
        v-for="item in displayValues",
        @click="onSelect(item)"
      ) {{ item }}
        //slot(v-bind:item="item")

</div>
</template>

<script>
export default {
  name: "sp-select",
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
    values: {
      default: () => [],
    },
    hideSelected: {
      default: true,
    },
  },
  data: () => ({
    search: "",
    focus: false,
  }),
  computed: {
    displayValues() {
      return this.hideSelected && this.multi
        ? this.values.without(this.value)
        : this.values;
    },
  },
  mounted() {
    this.search = this.value;
  },
  watch: {
    value() {
      this.search = this.value;
    },
  },

  methods: {
    onSelect(item) {
      if (this.multi) {
        this.search = "";
        this.$emit("input", [...this.value, item]);
      } else {
        this.search = item;
        this.$emit("input", [item]);
      }
      this.focus = false;
    },
    remove(index) {
      this.$emit("input", [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1),
      ]);
    },
    delay_blur() {
      setTimeout(() => {
        this.focus = false;
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
