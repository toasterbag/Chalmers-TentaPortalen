<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<template lang="pug">
div
  .text-muted.text-sm.font-bold 2022-08-09
  h2.mb-2 Changelog 22.8
  p In preparation for the new year we have made some improvements to the site.

  h3.mb-2.mt-4 Dark mode
  span Use the new switch &nbsp;
  span.desktop-only
    Highlight(selector="[data-highlight='menu']") in the menu on the top right of the page
  span.mobile-only the navigation drawer
  span &nbsp;to toggle between light and dark mode. Try it out immediately with the switch below!
  .pt-4.flex.justify-center
    ThemeSwitch

  h3.mb-2.mt-4 Course survey answer frequency
  span You can now find charts showing the answer frequency on course surveys compared to other student divisions. This is useful for divisions who want to arrange competitions or if you are just curious! These statistics can be found under the Rankings category.

  h3.mb-2.mt-4 TentaPortalen is now available in Swedish
  span TentaPortalen is from now on also available in Swedish. We try to match the language automatically so it might already appear in Swedish for you. You can switch language using the menu in the top right corner or the card below.
  .pt-4.flex.justify-around
    a.flex.justify-between.items-center.w-56.bg-base-200.p-4(
      href="/sv",
      hreflang="sv-SE"
    )
      .text-lg Svenska
      img(src="../../../assets/SE.svg")
    a.flex.justify-between.items-center.w-56.bg-base-200.p-4(
      href="/en",
      hreflang="en-GB"
    )
      .text-lg English
      img(src="../../../assets/GB.svg")

  h3.mb-2.mt-4 Exam counter
  span The front page now shows how many exams there are in the database. Currently we only cover a small percentage of all courses so we still have a long way to go. You can also find out which exams are missing and filter by programme plan.

  .flex.justify-center
    .mt-2.pl-2.w-full.bg-base-200.rounded
      AvailableExams

  h3.mb-2.mt-4 Feedback
  div
    span Remember that you can leave feedback on features you want to see&nbsp;
    Link(:to="{ name: 'feedback' }") here
    span . This is how most features make their way to the site!
</template>
