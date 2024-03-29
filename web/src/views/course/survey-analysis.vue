<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-center.border-bottom
    .col-12.p-3
      .fs-3 Answer Frequency
      .text-muted How many students responded to the survey? (percentage)
      LineChart(
        :labels="labels",
        :data="answer_frequency_data",
        :scales="{ yAxis: { min: 0, max: 100 } }",
        :dots="true"
      )

  .row.justify-content-center.border-bottom(v-for="chart in charts")
    .col-12.p-3
      .fs-3 {{ chart.title }}
      .text-muted {{ chart.subtitle }}
      LineChart(
        :labels="labels",
        :data="chart.data",
        :scales="{ yAxis: { min: 0, max: 5 } }",
        :dots="true",
        :comments="comments"
      )
  //- .row.justify-content-center.border-bottom(v-for="chart in charts")
  //-   .col-12.p-3
  //-     .fs-3 {{ chart.title }}
  //-     .text-muted {{ chart.subtitle }}
  //-     survey-line-chart(
  //-       :labels="labels",
  //-       :means="chart.means",
  //-       :medians="chart.medians",
  //-       :display-mean="display_mean_values",
  //-       :display-exams="show_exams",
  //-       :comments="comments",
  //-       :exams="primary_exams"
  //-     )
  //- teleport(to="sidebar-right")
  //-   .d-flex.justify-content-end.sticky-top.pt-4
  //-     .sidebar
  //-       .form-check.pe-4
  //-         input#show-exams.form-check-input(
  //-           type="checkbox",
  //-           v-model="show_exams"
  //-         )
  //-         label.form-check-label.user-select-none(for="show-exams")
  //-           | Show exams
Spinner(v-else)
</template>

<script>
import Http from "../../plugins/http";
import { preference } from "vue-preferences";

export default {
  name: "course-survey-analysis",
  data: () => ({
    ready: false,
    surveys: [],
    comments: [],
    show_exams: false,
    course: undefined,
    programme_average: undefined,
    chalmers_average: undefined,
  }),

  computed: {
    display_mean_values: preference("display_mean_survey_values", {
      defaultValue: true,
    }),
    labels() {
      return this.surveys.map((s) => s.academic_year);
    },
    answer_frequency_data() {
      return [
        {
          label: "This course",
          data: this.surveys.map((s) => s["answer_frequency"]),
          color: CSS.getVar("sp-red"),
        },
        {
          label: `${this.course.owner_code} average`,
          data: this.programme_average.map((e) => e.answer_frequency),
        },
        {
          label: "Chalmers average",
          data: this.chalmers_average.map((e) => e.answer_frequency),
          color: "#006C5C",
        },
      ];
    },
    charts() {
      return [
        {
          title: "Overall impression",
          subtitle: "What is your overall impression of the course?",
          median_key: "total_impression_median",
          mean_key: "total_impression_mean",
        },
        {
          title: "Prerequisites",
          subtitle:
            "I had enough prior knowledge to be able to follow the course",
          median_key: "prerequisite_median",
          mean_key: "prerequisite_mean",
        },
        {
          title: "Learning outcomes",
          subtitle:
            "The learning outcomes (see course plan) clearly describe what I was expected to learn in the course",
          median_key: "goals_median",
          mean_key: "goals_mean",
        },
        {
          title: "Structure",
          subtitle:
            "The course structure (as divided into lectures, exercises, lab sessions, simulations etc.) is appropriate in order to reach the intended learning outcome of the course",
          median_key: "structure_median",
          mean_key: "structure_mean",
        },
        {
          title: "Teaching",
          subtitle: "The teaching worked well",
          median_key: "teaching_median",
          mean_key: "teaching_mean",
        },
        {
          title: "Course litterature",
          subtitle:
            "The course literature (including other course material) supported the learning well",
          median_key: "litterature_median",
          mean_key: "litterature_mean",
        },
        {
          title: "Assessment",
          subtitle:
            "The assessment (including all compulsory elements, exams, assignments etc.) tested whether I had reached the intended learning outcomes of the course",
          median_key: "assessment_median",
          mean_key: "assessment_mean",
        },
        {
          title: "Course administration",
          subtitle:
            "The course administration (information during the course, course memo, course homepage etc.) worked well",
          median_key: "administration_median",
          mean_key: "administration_mean",
        },
        {
          title: "Workload",
          subtitle:
            "The course workload as related to the number of credits was...",
          median_key: "workload_median",
          mean_key: "workload_mean",
        },
        {
          title: "Working environment",
          subtitle:
            "The organization, content and teaching of this course have been designed and executed so that everyone can feel included, welcome and seen",
          median_key: "working_environment_median",
          mean_key: "working_environment_mean",
        },
      ].map(({ title, subtitle, median_key, mean_key }) => ({
        title,
        subtitle,
        data: [
          {
            label: "Median",
            data: this.surveys.map((s) => s[median_key]),
            color: CSS.getVar("sp-green"),
          },
          {
            label: "Mean",
            data: this.surveys.map((s) => s[mean_key]),
            color: CSS.getVar("sp-red"),
          },
          // {
          //   label: `${this.course.owner_code} mean`,
          //   data: this.programme_average.map((e) => e[mean_key]),
          //   color: "#06D6A0",
          // },
          // {
          //   label: "Chalmers mean",
          //   data: this.chalmers_average.map((e) => e[mean_key]),
          //   color: "#006C5C",
          // },
        ],
      }));
    },
    _charts() {
      return [
        {
          title: "Overall impression",
          subtitle: "What is your overall impression of the course?",
          median_key: "total_impression_median",
          mean_key: "total_impression_mean",
        },
        {
          title: "Prerequisites",
          subtitle:
            "I had enough prior knowledge to be able to follow the course",
          median_key: "prerequisite_median",
          mean_key: "prerequisite_mean",
        },
        {
          title: "Learning outcomes",
          subtitle:
            "The learning outcomes (see course plan) clearly describe what I was expected to learn in the course",
          median_key: "goals_median",
          mean_key: "goals_mean",
        },
        {
          title: "Structure",
          subtitle:
            "The course structure (as divided into lectures, exercises, lab sessions, simulations etc.) is appropriate in order to reach the intended learning outcome of the course",
          median_key: "structure_median",
          mean_key: "structure_mean",
        },
        {
          title: "Teaching",
          subtitle: "The teaching worked well",
          median_key: "teaching_median",
          mean_key: "teaching_mean",
        },
        {
          title: "Course litterature",
          subtitle:
            "The course literature (including other course material) supported the learning well",
          median_key: "litterature_median",
          mean_key: "litterature_mean",
        },
        {
          title: "Assessment",
          subtitle:
            "The assessment (including all compulsory elements, exams, assignments etc.) tested whether I had reached the intended learning outcomes of the course",
          median_key: "assessment_median",
          mean_key: "assessment_mean",
        },
        {
          title: "Course administration",
          subtitle:
            "The course administration (information during the course, course memo, course homepage etc.) worked well",
          median_key: "administration_median",
          mean_key: "administration_mean",
        },
        {
          title: "Workload",
          subtitle:
            "The course workload as related to the number of credits was...",
          median_key: "workload_median",
          mean_key: "workload_mean",
        },
        {
          title: "Working environment",
          subtitle:
            "The organization, content and teaching of this course have been designed and executed so that everyone can feel included, welcome and seen",
          median_key: "working_environment_median",
          mean_key: "working_environment_mean",
        },
      ].map(({ title, subtitle, median_key, mean_key }) => ({
        title,
        subtitle,
        medians: this.surveys.map((s) => s[median_key]),
        means: this.surveys.map((s) => s[mean_key]),
      }));
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.surveys = await Http.get(
        `course/${this.$route.params.code}/surveys`,
      );

      const primary_exams = await Http.get(
        `course/${this.$route.params.code}/exams/primary`,
      );

      const years = new Set(this.surveys.map((e) => e.academic_year));
      this.primary_exams = primary_exams
        .filter((e) => years.has(e.academic_year))
        .map((data) => {
          data.total = data.failed + data.three + data.four + data.five;
          const percentages = [
            data.failed,
            data.three,
            data.four,
            data.five,
          ].map((e) => e.div(data.total).mul(100));
          const [failed, three, four, five] = Math.roundToTarget(
            percentages,
            100,
          );

          data.failed = failed;
          data.three = three;
          data.four = four;
          data.five = five;
          return data;
        });

      this.comments = this.surveys
        .filter((s, i, arr) => {
          if (i == 0) return true;
          return s.instance.examiner.cid !== arr[i - 1].instance.examiner.cid;
        })
        .map((s) => ({
          index: s.academic_year,
          comment: s.instance.examiner.name,
          color: "rgba(91, 142, 125, 0.3)",
        }));

      this.course = await Http.get(`course/${this.$route.params.code}`);
      const programme_by_year = await Http.get(
        `programme/${this.course.owner_code}/surveys`,
      );
      this.programme_average = Object.values(programme_by_year);

      this.chalmers_average = Object.values(await Http.get(`survey/chalmers`));

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  top: 10vh;
}
</style>
