<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useLocalization } from "../plugins/localization";

export default defineComponent({
  name: "FAQ",
  setup() {
    const l = useLocalization();
    const { tl } = storeToRefs(l);
    document.title = l.title(tl.value.pages.faq.title);
    return {
      tl,
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center
  .grid.grid-cols-1.gap-8(class="lg:grid-cols-2")
    div
      //- h2 Why can't I find my exam?
      //- .mb-8
      //-   | There are a lot of reasons. The short answer is that LADOK does not know about the exam or that it is not recorded as an exam (tentamen).
      //-   | It is very difficult to import the LADOK data so there may be special cases which we may have missed. If you think that your exam might be missing
      //-   Link.ps-1.text-accent(:to="{ name: 'feedback' }") &nbsp;please contact us.

      h2.mb-4 {{ tl.pages.faq.what_is_tento_ergo_sum.title }}
      .whitespace-pre-line {{ tl.pages.faq.what_is_tento_ergo_sum.answer }}

    div
      h2.mb-4 {{ tl.pages.faq.when_is_the_page_updated.title }}
      .whitespace-pre-line {{ tl.pages.faq.when_is_the_page_updated.answer }}

    //- div
    //-   h2 Why can't I find the data for the survey question about "Working environment"?
    //-   div This question was only used for two years and provided negligable insight into the course. It has since been removed from the official survey and because it didn't provide enough valuable information I decided to remove the charts as they provided more confused than answers. The data is still available from the API and database dumps &nbsp;
    //-     a.text-primary(
    //-       href="https://tenta.davebay.net/public/dumps/db-latest.sql.gz"
    //-     ) here.
</template>
