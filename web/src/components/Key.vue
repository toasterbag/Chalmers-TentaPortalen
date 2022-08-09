<template lang="pug">
.key.mx-1.bg-base-100.desktop-only.text-base-content.border-2.border-base-300
  slot
</template>

<script lang="ts">
export default {
  name: "Key",
};
</script>

<style lang="scss" scoped>
.key {
  text-align: center;
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 6px;
  height: 30px;
  user-select: none;
}
</style>
