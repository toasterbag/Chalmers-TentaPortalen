<template lang="pug">
.row.justify-content-center
  .col-12.col-md-8
    .pb-4
      .fs-3 Address Book
      div
        | Here are some useful email addresses if you need to contact study boards or student representatives
    .pb-4
      .fs-4 Boards of Education
      table.table
        thead
          tr
            td Name
            td Email
        tbody.table-striped
          tr(v-for="{ name, email, programmes } in boards")
            td {{ name }}
            td {{ email.join('') }}
            //- td {{ programmes.join(', ') }}
    .pb-4
      .fs-4 Education area representatives
      table.table
        thead
          tr
            td Name
            td Email
        tbody.table-striped
          tr(v-for="{ name, email } in uor")
            td {{ name }}
            td {{ email.join('') }}
</template>

<script lang="ts">
export default {
  name: "glossary",
  setup() {
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

    return {
      boards,
      uor,
      irr,
    };
  },
};
</script>

<style lang="scss" scoped></style>
