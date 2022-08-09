<template lang="pug">
.view-margin.flex.flex-col.gap-8
  div
    h1 Academical calendar 2022/2023
    div
      | This calendar is an aggregation of several official Chalmers calendars in one place, for your convenience. Sources can be found at the bottom.

  div
    .text-lg.font-bold Table of contents
    .p-2.bg-base-200.w-64
      .pl-2
        a.block.text-lg.font-bold(href="#terms") 1. Terms
        a.block.text-lg.font-bold(href="#exams") 2. Exams
        .pl-2
          a.block(
            v-for="({ title, slug }, index) in tables",
            :href="`#${slug}`"
          ) 2.{{ index + 1 }} {{ title }}
        a.block.text-lg.font-bold(href="#self-studies") 3. Self studies
        a.block.text-lg.font-bold(href="#course-selections") 4. Course selections

  div
    h2#terms.mb-4 Terms
    .grid.grid-cols-3.w-full.font-bold(class="max-w-[40rem]")
      .col-span-1 Term
      .col-span-1 Start
      .col-span-1 End
    .grid.grid-cols-3.w-full(class="max-w-[40rem]")
      .col-span-1.font-bold Autumn
      .col-span-1 Monday 29 August 2022
      .col-span-1 Sunday 15 January 2023
    .grid.grid-cols-3.w-full(class="max-w-[40rem]")
      .col-span-1.font-bold Spring
      .col-span-1 Monday 16 January 2023
      .col-span-1 Sunday 4 June 2023

  div
    h2#exams.mb-4 Exams
    .flex.flex-col.gap-8
      div(v-for="{ title, events, start, end, slug } in tables")
        h4(:id="slug") {{ title }}
        .text-sm.mb-2(v-if="start && end")
          span.font-bold.pr-1 Start:
          span.pr-4 {{ start }}
          span.font-bold.pr-1 End:
          span {{ end }}
        table.tp-table
          thead
            tr
              td Event
              td Start
              td End
          tbody
            tr(v-for="{ event, start, end } in events")
              td(class="w-[18rem]") {{ event }}
              td {{ start }}
              td {{ end }}

  div
    h2#course-selections.mb-4 Course selections

    table.tp-table
      thead
        tr
          td Period
          td Selection opens
          td Selection closes
      tbody
        tr
          td(class="w-[18rem]") 1
          td 2022-05-04
          td 2022-05-17
        tr
          td(class="w-[18rem]") 2
          td 2022-10-13
          td 2022-10-20
        tr
          td(class="w-[18rem]") 3 & 4
          td TBD
          td TBD
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Calendar",
  setup() {
    const examEvents = [
      {
        event: "CHARM (Career contact days)",
        start: "2023-02-07",
        end: "2023-02-08",
      },
      {
        event: "Personal growth training program - Of Course",
        start: "2023-02-16",
        end: "2023-02-16",
      },
    ];

    const selfStudy = [
      {
        event: "Self-study (Christmas break)",
        start: "2022-12-19",
        end: "2023-01-02",
      },
      {
        event: "Self-study (Easter)",
        start: "2023-04-06",
        end: "2023-04-11",
      },
      {
        event: "Self-study (Ascension Day)",
        start: "2023-05-19",
        end: "2023-05-19",
      },
    ];

    const tables = [
      {
        title: "August re-exams",
        slug: "auguust-re-exams",
        events: [
          {
            event: "Re-exam sign ups",
            start: "2022-07-04",
            end: "2022-07-29",
          },
          {
            event: "August re-exams",
            start: "2022-08-15",
            end: "2022-08-27",
          },
        ],
      },
      {
        title: "October re-exams",
        slug: "october-re-exams",
        events: [
          {
            event: "Re-exam sign-ups",
            start: "2022-08-22",
            end: "2022-09-22",
          },
          {
            event: "October re-exams",
            start: "2022-10-07",
            end: "2022-10-08",
          },
        ],
      },
      {
        title: "Study period 1",
        slug: "sp1-exams",
        start: "2022-08-29",
        end: "2022-10-30",
        events: [
          {
            event: "Exam sign-ups",
            start: "2022-08-08",
            end: "2022-10-09",
          },
          {
            event: "Exams",
            start: "2022-10-22",
            end: "2022-10-29",
          },
        ],
      },
      {
        title: "January re-exams",
        slug: "january-re-exams",
        events: [
          {
            event: "Re-exam sign-ups",
            start: "2022-11-21",
            end: "2022-12-18",
          },
          {
            event: "Re-exams",
            start: "2023-01-03",
            end: "2023-01-05",
          },
        ],
      },
      {
        title: "Study period 2",
        slug: "sp2-exams",
        start: "2022-10-31",
        end: "2023-01-15",
        events: [
          {
            event: "Exam sign-ups",
            start: "2022-10-10",
            end: "2022-12-21",
          },

          {
            event: "Exams",
            start: "2023-01-07",
            end: "2023-01-14",
          },
        ],
      },

      {
        title: "Study period 3",
        slug: "sp3-exams",
        start: "2023-01-16",
        end: "2023-03-19",
        events: [
          {
            event: "Exam sign-ups",
            start: "2022-12-26",
            end: "2023-02-26",
          },

          {
            event: "Exams",
            start: "2023-03-11",
            end: "2023-03-18",
          },
        ],
      },
      {
        title: "Easter re-exams",
        slug: "easter-re-exams",
        events: [
          {
            event: "Re-exam sign-ups",
            start: "2023-02-20",
            end: "2023-03-19",
          },
          {
            event: "Re-exams",
            start: "2023-04-03",
            end: "2023-04-05",
          },
        ],
      },
      {
        title: "Study period 4",
        slug: "sp4-exams",
        start: "2023-03-20",
        end: "2023-06-04",
        events: [
          {
            event: "Exam sign-ups",
            start: "2023-02-27",
            end: "2023-05-10",
          },

          {
            event: "Exams",
            start: "2023-05-27",
            end: "2023-06-03",
          },
        ],
      },
      {
        title: "June re-exams",
        slug: "june-re-exams",
        events: [
          {
            event: "Re-exam sign-ups",
            start: "2023-04-24",
            end: "2023-05-22",
          },
          {
            event: "Re-exams",
            start: "2023-06-07",
            end: "2023-06-09",
          },
        ],
      },
    ];

    const sources = [
      {
        title: "The academic year",
        url: "https://www.student.chalmers.se/sp/academic_year_list",
      },
      {
        title: "Course selections",
        url: "https://student.portal.chalmers.se/en/chalmersstudies/courseinformation/CourseSelection/Pages/Course-selection-next-semester.aspx",
      },
      {
        title: "Anmälan Masterprogram",
        url: "https://student.portal.chalmers.se/sv/chalmersstudier/valja-masterprogram/Sidor/Anmalan-masterprogram.aspx",
      },
    ];

    // TODO
    // Master selection
    // Kandidatarbete
    // Last day to report exam results to LADOK
    // Master thesis (probably too unstandardized)
    // Misc events, Of course etc.

    return { tables };
  },
});
</script>

<style lang="scss" scoped></style>
