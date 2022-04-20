<template lang="pug">
.row.justify-content-center
  .col-10.col-md-8
    .fs-2 Programme survey data
    div ⚠️ Years with fewer than 5 courses are removed to keep results relevant
    div ⚠️ Current year is updated as more results are published

    .row.justify-content-center.border-bottom.py-4
      .col-12
        .fs-3 Answer frequency
        .text-muted How many responded to the survey? (percentage)
        LineChart(
          :labels="labels",
          :data="answerFrequency",
          :scales="{ yAxis: { min: 0, max: 100 } }"
        )

    .row.justify-content-center.border-bottom.py-4(v-for="chart in charts")
      .col-12
        .fs-3 {{ chart.title }}
        .text-muted {{ chart.subtitle }}
        LineChart(
          :labels="labels",
          :data="chart.data",
          :scales="{ yAxis: { min: 1, max: 5 } }"
        )
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useAPI } from "../../plugins/api";
import { useTheme } from "../../plugins/theme";

export default defineComponent({
  name: "ProgrammeSurveyAnalysis",
  props: {
    code: {
      required: true,
      type: String,
    }
  },
  async setup(props) {
    const api = useAPI();
    const theme = useTheme();

    // const onKeydown = (e: KeyboardEvent) => {
    //   if (!isNaN(Number(e.key))) {
    //     location.hash = `#${e.key}`;
    //   }
    // }

    // document.addEventListener("keydown", onKeydown);
    // onUnmounted(() => {
    //   console.log("remove listener")
    //   document.removeEventListener("keydown", onKeydown);
    // });

    const programmeByYear = await api.fetchProgrammeSurveyAggregate(props.code);

    const programmeAverage = Object.values(programmeByYear);

    const chalmersAverage = Object.values(await api.fetchChalmersSurveyAggregate());

    const labels = computed(() => Object.keys(programmeByYear).map((year) => year.replace(/20(\d{2})\/20(\d{2})/g, "$1/$2")));

    const answerFrequency = computed(() =>
      [
        {
          label: `${props.code} average`,
          data: programmeAverage.map((e: any) => e.answer_frequency),
          color: theme.get("sp-purple"),
        },
        {
          label: "Chalmers average",
          data: chalmersAverage.map((e: any) => e.answer_frequency),
          color: "#006C5C",
        },
      ]
    );

    const charts = computed(() =>
      [
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
      ].map(({ title, subtitle, mean_key }) => ({
        title,
        subtitle,
        data: [
          {
            label: props.code,
            data: programmeAverage.map((s) => s[mean_key]),
            color: theme.get("sp-purple"),
          },
          {
            label: "Chalmers",
            data: chalmersAverage.map((s) => s[mean_key]),
            color: "#006C5C",
          },
        ],
      })));

    return {
      charts, labels, answerFrequency
    }
  },
});
</script>

<style lang="scss" scoped></style>
