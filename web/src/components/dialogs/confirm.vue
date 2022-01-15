<template lang="pug">
.modal-content
  .modal-header.fs-2.fw-light Confirm
  .modal-body
    div {{ message }}
  .modal-footer
    .btn.bg-primary(@click="$emit('submit', true)") Confirm
    .btn.bg-accent(@click="$emit('submit', false)") Close
</template>

<script>
export default {
  name: "confirm-dialog",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
  methods: {
    async submit() {
      this.$dialog.hide();
    },
  },
};
</script>

<style lang="scss"></style>
