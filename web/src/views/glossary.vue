<template lang="pug">
.row.justify-content-center
  .col-12.col-md-8
    .pb-4
      .fs-4 Glossary
      div
        | There is much technical jargon at Chalmers. Here are some terms and their english equivalents as well as abbreviations commonly used. Click on a row to read a description.
    .pb-4
      .fs-4 Chalmers organisation
      table.table
        thead
          tr
            td Abbreviation
            td Swedish
            td English
        tbody.table-striped
          tr
            td GruLG
            td Grundutbildningens ledningsgrupp
            td ???
</template>

<script>
/*
  List of terms, serves as a TODO list.
  HST
  Grulg
  UOR
  IRR
  IR
  UO
  
*/
export default {
  name: "glossary",
};
</script>

<style lang="scss" scoped></style>
