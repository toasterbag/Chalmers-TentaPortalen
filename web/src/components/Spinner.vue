<template lang="pug">
.row.justify-content-center.pt-4
  .spinner-border.text-primary(role="status")
    span.visually-hidden Loading...
</template>

<script lang="ts">
export default {
  name: "Spinner",
};
</script>