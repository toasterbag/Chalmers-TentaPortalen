<template lang="pug">
div(v-if="this.ready")
  .fs-2 Programme survey data
  div ⚠️ Years with fewer than 5 courses are removed to keep results relevant
  div ⚠️ Current year is updated as more results are published

  .row.justify-content-center.border-bottom
    .col-12.p-3
      .fs-3 Answer frequency
      .text-muted How many responded to the survey? (percentage)
      LineChart(
        :labels="labels",
        :data="answer_frequency_data",
        :scales="{ yAxis: { min: 0, max: 100 } }"
      )

  .row.justify-content-center.border-bottom(v-for="chart in charts")
    .col-12.p-3
      .fs-3 {{ chart.title }}
      .text-muted {{ chart.subtitle }}
      LineChart(
        :labels="labels",
        :data="chart.data",
        :scales="{ yAxis: { min: 0, max: 5 } }"
      )
Spinner(v-else)
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "programme-surveys",
  data: () => ({
    ready: false,
    labels: [],
    programme_average: [],
    chalmers_average: [],
  }),

  computed: {
    answer_frequency_data() {
      return [
        {
          label: `${this.$route.params.code} average`,
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
          mean_key: "total_impression_mean",
        },
        {
          title: "Prerequisites",
          subtitle:
            "I had enough prior knowledge to be able to follow the course",
          mean_key: "prerequisite_mean",
        },
        {
          title: "Learning outcomes",
          subtitle:
            "The learning outcomes (see course plan) clearly describe what I was expected to learn in the course",
          mean_key: "goals_mean",
        },
        {
          title: "Structure",
          subtitle:
            "The course structure (as divided into lectures, exercises, lab sessions, simulations etc.) is appropriate in order to reach the intended learning outcome of the course",
          mean_key: "structure_mean",
        },
        {
          title: "Teaching",
          subtitle: "The teaching worked well",
          mean_key: "teaching_mean",
        },
        {
          title: "Course litterature",
          subtitle:
            "The course literature (including other course material) supported the learning well",
          mean_key: "litterature_mean",
        },
        {
          title: "Assessment",
          subtitle:
            "The assessment (including all compulsory elements, exams, assignments etc.) tested whether I had reached the intended learning outcomes of the course",
          mean_key: "assessment_mean",
        },
        {
          title: "Course administration",
          subtitle:
            "The course administration (information during the course, course memo, course homepage etc.) worked well",
          mean_key: "administration_mean",
        },
        {
          title: "Workload",
          subtitle:
            "The course workload as related to the number of credits was...",
          mean_key: "workload_mean",
        },
        {
          title: "Working environment",
          subtitle:
            "The organization, content and teaching of this course have been designed and executed so that everyone can feel included, welcome and seen",
          mean_key: "working_environment_mean",
        },
      ].map(({ title, subtitle, mean_key }) => ({
        title,
        subtitle,
        data: [
          {
            label: `${this.$route.params.code} mean`,
            data: this.programme_average.map((e) => e[mean_key]),
          },
          {
            label: "Chalmers mean",
            data: this.chalmers_average.map((e) => e[mean_key]),
            color: "#006C5C",
          },
        ],
      }));
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const programme_by_year = await Http.get(
        `programme/${this.$route.params.code}/surveys`,
      );
      this.labels = Object.keys(programme_by_year);

      this.programme_average = Object.values(programme_by_year);

      this.chalmers_average = Object.values(await Http.get(`survey/chalmers`));

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
