<template lang="pug">
.view-margin
  .flex.justify-between
    .py-3
      .text-lg.font-semibold.font-header
        span {{ programme.name_en.trim() }}
        .italic {{ programme.name_sv }}
      .py-2
        .flex.justify-between.flex-col(class="md:gap-4 md:flex-row")
          .pr-2 Programme code:&nbsp;
            span.font-bold {{ programme.code }}
  View
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import Http from "../../plugins/http";

export default defineComponent({
  name: "ProgrammeView",

  async setup() {
    const route = useRoute();
    const programme = await Http.get(`programme/${route.params.code}`);
    // const latest_instance = programme.instances[0].instance_id;
    return {
      // coursePortalUrl: `https://student.portal.chalmers.se/sv/chalmersstudier/programinformation/Sidor/SokProgramutbudet.aspx?program_id=${latest_instance}&parsergrp=1`,
      programme,
      route,
    };
  },
});
</script>
