<template lang="pug">
.sp-switch
  label
    | {{ leftText }}
    input(type="checkbox", :checked="value", @input="toggle")
    span.lever(:class="{ dual }")
    | {{ rightText }}
</template>

<script>
export default {
  name: "sp-switch",
  data: () => ({
    value: false,
  }),
  props: {
    leftText: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    dual: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.value = this.$attrs.value;
  },
  methods: {
    toggle() {
      this.value = !this.value;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
$switch-bg-color: var(--p) !default;
$switch-unchecked-bg: #f1f1f1 !default;
$switch-unchecked-lever-bg: rgba(0, 0, 0, 0.38) !default;
$switch-radius: 15px !default;

.sp-switch,
.sp-switch * {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.sp-switch label {
  cursor: pointer;
}

.sp-switch label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .lever {
    opacity: 0.85;
    background-color: $switch-bg-color;

    &:before,
    &:after {
      left: 18px;
    }

    &:after {
      background-color: $switch-bg-color;
    }
  }
}

.sp-switch label .lever {
  content: "";
  display: inline-block;
  position: relative;
  width: 36px;
  height: 14px;
  background-color: $switch-unchecked-lever-bg;
  border-radius: $switch-radius;
  margin-right: 10px;
  transition: background 0.3s ease;
  vertical-align: middle;
  margin: 0 16px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease,
      transform 0.1s ease;
  }

  &:before {
    opacity: 0.85;
    background-color: $switch-bg-color;
  }

  &:after {
    background-color: $switch-unchecked-bg;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  &.dual:after {
    background-color: $switch-bg-color;
  }
}

// Switch active style
input[type="checkbox"]:checked:not(:disabled) ~ .lever:active::before,
input[type="checkbox"]:checked:not(:disabled).tabbed:focus ~ .lever::before,
input[type="checkbox"][dual]:not(:disabled) ~ .lever::before {
  transform: scale(2.4);
  opacity: 0.85;
  background-color: $switch-bg-color;
}

input[type="checkbox"]:not(:disabled) ~ .lever:active:before,
input[type="checkbox"]:not(:disabled).tabbed:focus ~ .lever::before {
  transform: scale(2.4);
  background-color: rgba(0, 0, 0, 0.08);
}

// Disabled Styles
.sp-switch input[type="checkbox"][disabled] + .lever {
  cursor: default;
  background-color: rgba(0, 0, 0, 0.12);
}

.sp-switch label input[type="checkbox"][disabled] + .lever:after,
.sp-switch label input[type="checkbox"][disabled]:checked + .lever:after {
  background-color: var(--input-disabled-solid-color);
}
</style>
