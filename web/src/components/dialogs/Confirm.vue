<template lang="pug">
.modal-content
  .modal-header.fs-2.fw-light Confirm
  .modal-body
    div {{ message }}
  .modal-footer
    .btn.bg-primary(@click="$emit('submit', true)") Confirm
    .btn.bg-accent(@click="$emit('submit', false)") Close
</template>

<script lang="ts">
import { useDialog } from "@plugins/dialog";

export default {
  name: "ConfirmDialog",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
