<template lang="pug">
.px-3(v-if="this.ready")
  .row
    .fs-2 Quick facts

  .row.pt-2
    .fs-2.fw-light Exams
  .row.pb-2
    .col-4
      .fs-4.text-muted.fw-light Total written exams since 2010
      .fs-5 {{ total_exams }} exams
    .col-4
      .fs-4.text-muted.fw-light Average fail rate
      .fs-5 {{ avg_fail_rate }}%

  .row.pt-2
    .fs-2.fw-light Courses
  .row.pb-3
    .col-4
      .fs-4.text-muted.fw-light Course instances held since 20XX
      .fs-5 {{ facts.course_instances }} instances

  //- .row.pt-2
  //-   .fs-2.fw-light Programme failrate (last three years)
  //- .row.pb-3
  //-   .col-6
  //-     .fs-4.text-muted.fw-light Highest fail rate
  //-     .fs-5 
  //-       span.capitalize {{ facts.programme_by_grade.last().name_en.toLowerCase() }}
  //-       span &nbspwith {{ facts.programme_by_grade.last().failrate }}%
  //-   .col-6
  //-     .fs-4.text-muted.fw-light Lowest fail rate
  //-     .fs-5 
  //-       span.capitalize {{ facts.programme_by_grade[0].name_en.toLowerCase() }}
  //-       span &nbspwith {{ facts.programme_by_grade[0].failrate }}%

  //- .row.pt-2
  //-   .fs-2.fw-light Programme satisfaction (last three years)
  //- .row.pb-3
  //-   .col-6
  //-     .fs-4.text-muted.fw-light Highest satisfaction
  //-     .fs-5 
  //-       span.capitalize {{ facts.programme_by_satisfaction.last().name_en.toLowerCase() }}
  //-       span &nbspwith {{ facts.programme_by_satisfaction.last().total_impression_mean.roundTo(2) }} of 5.00
  //-   .col-6
  //-     .fs-4.text-muted.fw-light Lowest satisfaction
  //-     .fs-5
  //-       span.capitalize {{ facts.programme_by_satisfaction[0].name_en.toLowerCase() }}
  //-       span &nbsp;with {{ facts.programme_by_satisfaction[0].total_impression_mean.roundTo(2) }} of 5.00
</template>

<script>
import Http from "../plugins/http";

export default {
  name: "passrate-by-period",
  data: () => ({
    ready: false,
    facts: {
      exams_written: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      course_instances: 0,
      programme_grades: [],
      programme_by_satisfaction: [],
    },
  }),

  computed: {
    total_exams() {
      return (
        this.facts.exams_written.failed +
        this.facts.exams_written.three +
        this.facts.exams_written.four +
        this.facts.exams_written.five
      );
    },
    avg_fail_rate() {
      return this.facts.exams_written.failed
        .div(this.total_exams)
        .mul(100)
        .round();
    },
  },

  created() {
    this.load();
  },
  methods: {
    async load() {
      const res = await Http.get(`facts`);
      this.facts = res;
      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
