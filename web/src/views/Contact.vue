<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { storeToRefs } from "pinia";

export default {
  name: "Contact",
  setup() {
    const l = useLocalization();
    const { tl } = storeToRefs(l);
    document.title = l.title(tl.value.pages.contact.title);
    const boards = [
      {
        name: "DNS",
        email: ["dns", "@dtek.se"],
        programmes: ["TKDAT", "MPALG", "MPCSN", "MPHPC"],
      },
      {
        name: "SnIT",
        email: ["snit", "@chalmers.it"],
        programmes: ["TKITE", "MPSOF", "MPIDE", "MPDSC"],
      },
      {
        name: "SNÆ",
        email: ["snae", "@aetek.chalmers.se"],
        programmes: ["TAFFS"],
      },
      {
        name: "SNF",
        email: ["snf", "@ftek.se"],
        programmes: ["TKTEM", "TKTFY", "MPCAS", "MPENM", "MPPHS", "MPNAT"],
      },
      {
        name: "SNTD",
        email: ["sntd", "@tdtek.chalmers.se"],
        programmes: ["TKDES", "MPDES"],
      },
      {
        name: "SNE",
        email: ["sne", "@elektroteknolog.se"],
        programmes: ["TKELT", "TKMED", "MPBME", "MPEPO", "MPEES"],
      },
      {
        name: "SNKfKb",
        email: ["sn", "@kfkb.se"],
        programmes: ["TKBIO", "TKKEF", "MPBIO"],
      },
      {
        name: "Utbildningsansvarig, Sjöstyret",
        email: ["utb", "@sjosektionen.com"],
        programmes: ["SBVII", "TSJKL", "TSILO", "TISJL", "MPMAR"],
      },
      {
        name: "AUU",
        email: ["auu", "@atek.chalmers.se"],
        programmes: ["TKARK"],
      },
      {
        name: "ATU",
        email: ["atu", "@atek.chalmers.se"],
        programmes: ["TKATK"],
      },
      {
        name: "SNV",
        email: ["snv", "@vtek.chalmers.se"],
        programmes: ["TKSAM", "TISAM", "MPDCM", "MPSOV", "MPIEE"],
      },
      {
        name: "Maskins utbildningsutskott",
        email: ["muu", "@mtek.chalmers.se"],
        programmes: ["TKMAS", "MPMOB", "MPAME", "MPAEM"],
      },
      {
        name: "Utbildningsansvarig, H-sektionen",
        email: ["utb", "@htek.chalmers.se"],
        programmes: ["TIDAL", "TIELL", "TIDSL", "TIMEL", "TIMAL", "TIEPL"],
      },
      {
        name: "Kemis utbildningsutskott",
        email: ["kuu", "@kemisektionen.com"],
        programmes: ["TIKEL", "TKKMT", "MPMCN"],
      },
      {
        name: "SNI",
        email: ["sni", "@itek.chalmers.se"],
        programmes: ["TKIEK", "MPMEI", "MPQOM", "MPSCM", "MPBDP"],
      },
      // {
      //   email: ["utbildningsansvarig", "@globalasystem.se"],
      //   programmes: ["TKGBS"],
      // },
      {
        name: "SNZ",
        email: ["snz", "@ztek.se"],
        programmes: ["TKAUT", "MPSYS"],
      },
      {
        name: "SAMO för Tekniskt basår",
        email: ["samo", "@tbkchalmers.se"],
        programmes: ["ZBASS"],
      },
    ].sortBy((a, b) => a.name.localeCompare(b.name));

    const uor = [
      { name: "EDIT-I", email: ["uor-editi", "@chs.se"] },
      { name: "ASAM", email: ["uor-asam", "@chs.se"] },
      { name: "MATS", email: ["uor-mats", "@chs.se"] },
      { name: "KFM", email: ["uor-kfm", "@chs.se"] },
    ].sortBy((a, b) => a.name.localeCompare(b.name));

    const irr = [
      {
        name: "Computer Science and Engineering",
        email: ["irr-cse", "@chs.se"],
      },
    ].sortBy((a, b) => a.name.localeCompare(b.name));

    const otherContacts = [
      {
        name: "Educational Officer",
        email: ["uo", "@chalmersstudentkar.se"],
      },
      {
        name: "Deputy educational Officer",
        email: ["vuo", "@chalmersstudentkar.se"],
      },
    ];

    return {
      boards,
      uor,
      irr,
      otherContacts,
      tl,
    };
  },
};
</script>

<template lang="pug">
.view-margin.flex.flex-col.gap-8
  div
    h1 {{ tl.pages.contact.heading }}
    div {{ tl.pages.contact.caption }}
  div
    h2 {{ tl.terms.academic_council }}
    table.tp-table
      thead
        tr
          td Name
          td Email
      tbody
        tr(v-for="{ name, email, programmes } in boards")
          td {{ name }}
          td {{ email.join("") }}
          //- td {{ programmes.join(', ') }}
  //- div
  //-   h2 Education area representatives
  //-   table.tp-table
  //-     thead
  //-       tr
  //-         td Name
  //-         td Email
  //-     tbody
  //-       tr(v-for="{ name, email } in uor")
  //-         td {{ name }}
  //-         td {{ email.join("") }}
  //- div
  //-   h2 Other
  //-   table.tp-table
  //-     thead
  //-       tr
  //-         td Name
  //-         td Email
  //-     tbody
  //-       tr(v-for="{ name, email } in otherContacts")
  //-         td {{ name }}
  //-         td {{ email.join("") }}
</template>
