<template lang="pug">
.container
  div(v-if="this.ready")
    .row.justify-content-between.mb-2
      //- tabs(:entries="nav_items")
      //-   .fs-4
      //-     span.bold {{ programme.code }}
      //-     | &nbsp;
      //-     span {{ programme.name_en }}
      //-     .fst-italic {{ programme.name_sv }}

    .row(v-for="[grade, periods] in this.plan")
      h2.pb-3 Grade {{ grade }}
      .row.pb-3(v-for="[period, entries] in periods")
        .tenta-table.p-3
          .row.header
            .col-3.col-md-2 Course code

          .row(v-for="entry in entries", :key="entry.course_code")
            .col-3 {{ entry.course_code }}
            .col-1
              .badge(:class="[electivity_color(entry.electivity)]") {{ entry.electivity }}

    //- .row.justify-content-center
    //-   .col-12
    //-     transition(name="fade", mode="out-in")
    //-       router-view
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "programme",
  data: () => ({
    ready: false,
    nav_items: [
      {
        title: "Exam statistics",
        route: "programme/exam-statistics",
      },
      {
        title: "Survey",
        route: "programme/course-survey",
      },
    ],

    plan: {},
  }),

  created() {
    this.load_programme();
  },
  methods: {
    electivity_rank(s) {
      switch (s) {
        case "Elective":
          return 1;
        case "ElectiveCompulsory":
          return 2;
        case "Compulsory":
          return 3;
      }
      return 0;
    },
    electivity_color(s) {
      switch (s) {
        case "Elective":
          return "bg-green";
        case "ElectiveCompulsory":
          return "bg-purple";
        case "Compulsory":
          return "bg-blue";
      }
      return "bg-red";
    },
    async load_programme() {
      let res = await Http.get(
        `programme/${this.$route.params.code}/${this.$route.params.start_year}/${this.$route.params.end_year}`
      );
      const by_grade = Object.entries(res.groupBy((x) => x.grade));
      const by_period = by_grade.map(([year, entries]) => [
        year,
        Object.entries(entries.groupBy((e) => e.course_instance.start_period)),
      ]);

      this.plan = by_period.map(([year, periods]) => [
        year,
        periods.map(([period, courses]) => [
          period,
          courses
            .filter((x) => x.course_code[3] !== "X")
            .sortBy((a, b) => {
              return (
                this.electivity_rank(b.electivity) -
                this.electivity_rank(a.electivity)
              );
            }),
        ]),
      ]);

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
