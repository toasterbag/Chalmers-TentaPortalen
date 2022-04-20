<template lang="pug">
.key.mx-1.bg-white.desktop-only
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
  border: 2px solid rgb(200, 200, 200);
  height: 30px;
  user-select: none;
}
</style>