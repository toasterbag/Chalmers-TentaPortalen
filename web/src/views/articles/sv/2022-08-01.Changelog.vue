<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<template lang="pug">
div
  .text-muted.text-sm.font-bold 2022-08-09
  h2.mb-2 Changelog 22.8
  p I förberedelse för det nya läsåret har vi uppdaterat sidan med några funktioner som användare bett om!

  h3.mb-2.mt-4 Dark mode
  span Du kan nu ändra mellan ljust och mörkt tema genom att klicka på Tema-knappen &nbsp;
  span.desktop-only
    Highlight(selector="[data-highlight='menu']") i menyn högst upp till höger.
  span.mobile-only i rullmenyn på mobilsidan.
  .pt-4.flex.justify-center
    ThemeSwitch

  h3.mb-2.mt-4 Svarsfrekvens på kursenkäter
  span Man kan nu hitta statistik på svarsfrekvens på kursenkäter sorterade per sektion och år. Detta är användbart för den nyfikna eller studienämnder som vill anordna tävlingar eller jämföra sig med andra program.

  h3.mb-2.mt-4 TentaPortalen finns nu på svenska
  span TentaPortalen finns nu både på engelska och svenska. Vi försöker matcha ditt språk automatiskt men om du vill byta manuellt kan du använda knapparna här.
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

  h3.mb-2.mt-4 Tesräknare
  span Du kan nu se hur många kurser som har gamla tentamensteser. I dagsläget täcker vi bara en bråkdel av alla kurser men förhoppningsvis kommer detta bli bättre under året! Du kan även se vilka kurser som saknar teser, filtrerat på programplan. Alla tentor är crowdsourcade av våra användare så glöm inte att även du kan bidra!

  .flex.justify-center
    .mt-2.pl-2.w-full.bg-base-200.rounded
      AvailableExams

  h3.mb-2.mt-4 Feedback
  div
    span Om du har fler förbättringar du skulle vilja se så tveka inte att höra av dig via vårt&nbsp;
    Link(:to="{ name: 'feedback' }") formulär
    span . Det är så vi vet vad som bör prioriteras!
</template>
