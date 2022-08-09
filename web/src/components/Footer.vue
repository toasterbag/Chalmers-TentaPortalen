<script lang="ts">
import { defineComponent } from "vue";
import { useAPI } from "../plugins/api";
import { storeToRefs } from "pinia";
import { useLocalization } from "../plugins/localization";

export default defineComponent({
  name: "Footer",
  setup() {
    const { isAdmin } = storeToRefs(useAPI());
    const { tl } = storeToRefs(useLocalization());

    return {
      isAdmin,
      tl,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.bg-base-200.py-2.gap-4.px-14.pb-12(
  class="lg:flex-row lg:px-16 lg:py-8 lg:justify-between"
)
  Brand(class="lg:hidden", size="2.2rem")
  Brand.hidden(class="lg:block", size="3rem")

  .flex.flex-col.bg-base-200.py-2.gap-4(class="lg:flex-row lg:justify-between lg:gap-8")
    div
      .text-2xl {{ tl.footer.code.title }}
      div
        i.fab.fa-github.pr-2
        a(href="https://github.com/toasterbag/course-portal", target="_blank") {{ tl.footer.code.github }}
      div
        i.fab.fa-github.pr-2
        a(href="https://github.com/toasterbag") {{ tl.footer.code.me }}

    div
      .text-2xl {{ tl.footer.admin.title }}
      Link(:to="{ name: 'Admin/Import' }") {{ tl.footer.admin.control_panel }}

    div
      .text-2xl {{ tl.footer.about.title }}
      div {{ tl.footer.about.maintained_by }} David Hedgren ({{ "david.hedgren" }}@dtek.se)
      Link(:to="{ name: 'feedback' }") {{ tl.footer.about.feedback }}

//- div
//-   .hide-above-md
//-     MobileFooter
//-   .hide-below-md
//-     DesktopFooter
</template>
