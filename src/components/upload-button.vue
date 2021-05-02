<template lang="pug">
.sp-upload.btn.bg-primary
  input(ref="upload", type="file", @input="onInput")
  | {{ text }}
</template>

<script>
export default {
  name: "sp-upload",
  props: {
    text: {
      required: false,
      default: "Upload",
    },
  },
  mounted() {
    this.value = this.$attrs.value;
  },
  methods: {
    onInput() {
      this.$emit("input", this.$refs.upload.files[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.sp-upload {
  position: relative;

  input[type="file"] {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
