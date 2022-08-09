<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import English from "./en/2022-08-01.Changelog.vue";
import Swedish from "./sv/2022-08-01.Changelog.vue";
export default defineComponent({
  name: "News.2022-08-01.Changelog",
  components: { English, Swedish },
  setup() {
    const { locale } = storeToRefs(useLocalization());
    return { locale };
  },
});
</script>

<template lang="pug">
div
  Swedish(v-if="locale === 'sv'")
  English(v-else)
</template>
