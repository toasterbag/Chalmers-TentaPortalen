<template lang="pug">
.row.d-flex.justify-content-center
  .col-12.col-lg-8
    .justify-content-center.border-bottom
      .py-3.p-2
        .d-flex.align-items-center(id="1")
          .fs-3.pe-2 Answer Frequency
          Key 1
          .badge.bg-primary.fs-6.mx-2 New
        .text-muted How many students responded to the survey? (percentage)
        LineChart(
          :labels="labels",
          :data="answerFrequency",
          :scales="{ yAxis: { min: 0, max: 100 } }",
          :dots="true"
        )

    .justify-content-center.border-bottom(v-for="(chart, index) in charts")
      .py-3.p-2
        .d-flex.align-items-center(:id="String(index + 2)") 
          .fs-3.pe-2 {{ chart.title }}
          Key {{ index + 2 }}
        .text-muted {{ chart.subtitle }}
        LineChart(
          :labels="labels",
          :data="chart.data",
          :scales="{ yAxis: { min: 1, max: 5 } }",
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
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Http from "../../plugins/http";
import { useTheme } from "../../plugins/theme";


export default defineComponent({
  name: "CourseSurveyAnalyis",

  async setup() {
    const route = useRoute();
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

    const surveys: Array<any> = await Http.get(
      `course/${route.params.code}/surveys`,
    );

    const comments = surveys
      .filter((s, i, arr) => {
        if (i == 0) return true;
        return s.instance.examiner.cid !== arr[i - 1].instance.examiner.cid;
      })
      .map((s) => ({
        index: s.academic_year.replace(/20(\d{2})\/20(\d{2})/g, "$1/$2"),
        comment: s.instance.examiner.name,
        color: "rgba(91, 142, 125, 0.3)",
      }));

    const course = await Http.get(`course/${route.params.code}`);
    const precursorCode = Number(course.course_code.slice(-2)) - 1
    console.log(course.course_code.slice(0, -2) + String(precursorCode))
    // const precursor = await Http.get(`course/${route.params.code}`);

    const programme_by_year = await Http.get(
      `programme/${course.owner_code}/surveys`,
    );
    const programme_average = Object.values(programme_by_year);

    const chalmers_average = Object.values(await Http.get(`survey/chalmers`));

    const labels = computed(() => surveys.map((s) => s.academic_year.replace(/20(\d{2})\/20(\d{2})/g, "$1/$2")));

    const answerFrequency = computed(() =>
      [{
        label: "This course",
        data: surveys.map((s) => s["answer_frequency"]),
        color: theme.get("sp-red"),
      },
      {
        label: `${course.owner_code} average`,
        data: programme_average.map((e: any) => e.answer_frequency),
        color: theme.get("sp-purple"),
      },
      {
        label: "Chalmers average",
        data: chalmers_average.map((e: any) => e.answer_frequency),
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
      ].map(({ title, subtitle, median_key, mean_key }) => ({
        title,
        subtitle,
        data: [
          {
            label: "Median",
            data: surveys.map((s) => s[median_key]),
            color: theme.get("sp-green"),
          },
          {
            label: "Mean",
            data: surveys.map((s) => s[mean_key]),
            color: theme.get("sp-red"),
          },
          {
            label: `${course.owner_code} mean`,
            data: programme_average.map((e: any) => e[mean_key]),
            color: "hsla(255, 25%, 59%, 1.0)",
          },
          // {
          //   label: "Chalmers mean",
          //   data: this.chalmers_average.map((e) => e[mean_key]),
          //   color: "#006C5C",
          // },
        ],
      })));

    // useEvent().addListener("keydown", (e) => {
    //   console.log(`useEvent: ${e.key}`);
    // })




    return {
      charts, labels, comments, course, answerFrequency
    }
  }
});
</script>

<style lang="scss" scoped>
.sidebar {
  top: 10vh;
}
</style>
