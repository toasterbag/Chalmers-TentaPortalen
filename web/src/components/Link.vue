<template lang="pug">
router-link(:to="to")
  slot
</template>

<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { computed } from "@vue/reactivity";
import { defineComponent, PropType } from "vue";
import {
  RouteLocationNamedRaw,
  RouteLocationPathRaw,
  RouteLocationRaw,
} from "vue-router";

export default defineComponent({
  name: "Link",
  props: {
    to: {
      required: true,
      type: Object as PropType<RouteLocationNamedRaw>,
    },
  },
  setup(props) {
    return {
      to: computed(() => {
        if (!props.to.params) props.to.params = {};
        if (!props.to.params.lang)
          props.to.params.lang = useLocalization().locale;
        return props.to;
      }),
    };
  },
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
