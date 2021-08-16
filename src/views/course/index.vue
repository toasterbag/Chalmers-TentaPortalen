<template lang="pug">
.row.justify-content-center
  .pb-3
    search-bar
  .col-12.col-lg-10(v-if="this.ready")
    .row.justify-content-between.mb-2.py-md-0.py-3
      tabs(:entries="nav_items")
        .py-md-0.py-3
          .fs-4
            span.bold {{ course.course_code }}
            | &nbsp;
            span {{ course.name_en }}
            .fst-italic {{ course.name_sv }}
          div
            span.pe-2
              | Owner:&nbsp;
              router-link(
                :to="{ name: 'programme/exam-statistics', params: { code: course.owner_code } }"
              ) {{ course.owner_code }}
            //- span.pe-2
            //-   a(
            //-     :href="`https://www.student.chalmers.se/sp/course?course_id=20564`"
            //-   )
            //-     i.fa.fa-home.pe-1
            //-     | View on the student portal

    .row
      transition(name="fade", mode="out-in")
        router-view
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "course",
  data: () => ({
    ready: false,
    nav_items: [
      {
        title: "Exam statistics",
        route: "course/exam-statistics",
      },
      {
        title: "Survey",
        route: "course/survey",
      },
      {
        title: "Exams & solutions",
        route: "course/materials",
      },
    ],

    course: {
      name_sv: undefined,
      name_en: undefined,
      course_code: undefined,
      owner_code: undefined,
    },
  }),

  created() {
    this.loadCourse();
  },
  methods: {
    async loadCourse() {
      let res = await Http.get(`course/${this.$route.params.code}`);
      this.course = res;
      this.ready = true;
      Http.log("course", this.$route.params.code);
    },
  },
};
</script>

<style lang="scss" scoped></style>
