<template lang="pug">
div
  .row.justify-content-center
    .col-10.col-lg-8
      .justify-content-between.desktop-only
        .py-3
          .fs-4
            span {{ programme.name_en.trim() }}
            .fst-italic {{ programme.name_sv }}
          div
            .pe-4 Code:&nbsp;
              span.fw-bold {{ programme.code }}
            //- div
            //-   a(
            //-     target="_blank",
            //-     :href="coursePortalUrl"
            //-   )
            //-     i.fa.fa-home.pe-1
            //-     | View on the student portal

      .justify-content-between.mobile-only
        .py-3
          .fs-6
            span {{ programme.name_en }}
            .fst-italic {{ programme.name_sv }}
          .py-2
            .d-flex
              .pe-2 Code:&nbsp;
                span.fw-bold {{ programme.code }}
              //- .pe-2
              //-   a(
              //-     target="_blank",
              //-     :href="coursePortalUrl"
              //-   )
              //-     i.fa.fa-home.pe-1
              //-     | View on the student portal


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
    }
  }
});
</script>
