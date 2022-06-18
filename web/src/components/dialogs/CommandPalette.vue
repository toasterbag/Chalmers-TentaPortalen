<template lang="pug">
div(:style="{ height: '70vh' }")
  SearchBar(:autofocus="true", @blur="$emit('hide')")
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommandPalette",
});
</script>

<style lang="scss"></style>
