<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade", mode="out-in")
    suspense
      component(
        v-if="Component",
        :is="Component",
        :key="route.path + JSON.stringify(route.params)"
      )
      template(#fallback)
        Spinner
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "View",
  setup() {
    const route = useRoute();
    return { route };
  },
});
</script>
