<template lang="pug">
i.fa-solid.fa-chevron-up(v-if="descending")
i.fa-solid.fa-chevron-down(v-else)
</template>

<script lang="ts">import { defineComponent } from "vue"

export default defineComponent({
  name: "SortingOrderIcon",
  props: {
    descending: {
      required: true,
    }
  }
});
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