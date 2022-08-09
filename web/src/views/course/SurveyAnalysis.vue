<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Http from "../../plugins/http";
import { useTheme } from "../../plugins/theme";
import { useLocalization } from "../../plugins/localization";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "CourseSurveyAnalyis",

  async setup() {
    const route = useRoute();
    const theme = useTheme();
    const { tl } = storeToRefs(useLocalization());

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
    const precursorCode = Number(course.course_code.slice(-2)) - 1;
    console.log(course.course_code.slice(0, -2) + String(precursorCode));
    // const precursor = await Http.get(`course/${route.params.code}`);

    const programme_by_year = await Http.get(
      `programme/${course.owner_code}/surveys`,
    );
    const programme_average = Object.values(programme_by_year);

    const chalmers_average = Object.values(await Http.get(`survey/chalmers`));

    const labels = computed(() =>
      surveys.map((s) =>
        s.academic_year.replace(/20(\d{2})\/20(\d{2})/g, "$1/$2"),
      ),
    );

    const answerFrequency = computed(() => [
      {
        label: tl.value.ui.this_course,
        data: surveys.map((s) => s["answer_frequency"]),
        color: theme.get("tp-red"),
      },
      {
        label: `${course.owner_code} ${tl.value.ui.mean}`,
        data: programme_average.map((e: any) => e.answer_frequency),
        color: theme.get("tp-purple"),
      },
      {
        label: `Chalmers ${tl.value.ui.mean}`,
        data: chalmers_average.map((e: any) => e.answer_frequency),
        color: "#006C5C",
      },
    ]);

    const charts = computed(() =>
      [
        {
          title: tl.value.survey.overall_impression.title,
          subtitle: tl.value.survey.overall_impression.caption,
          median_key: "total_impression_median",
          mean_key: "total_impression_mean",
        },
        {
          title: tl.value.survey.prerequisites.title,
          subtitle: tl.value.survey.prerequisites.caption,
          median_key: "prerequisite_median",
          mean_key: "prerequisite_mean",
        },
        {
          title: tl.value.survey.learning_outcomes.title,
          subtitle: tl.value.survey.learning_outcomes.caption,
          median_key: "goals_median",
          mean_key: "goals_mean",
        },
        {
          title: tl.value.survey.structure.title,
          subtitle: tl.value.survey.structure.caption,
          median_key: "structure_median",
          mean_key: "structure_mean",
        },
        {
          title: tl.value.survey.teaching.title,
          subtitle: tl.value.survey.teaching.caption,
          median_key: "teaching_median",
          mean_key: "teaching_mean",
        },
        {
          title: tl.value.survey.litterature.title,
          subtitle: tl.value.survey.litterature.caption,
          median_key: "litterature_median",
          mean_key: "litterature_mean",
        },
        {
          title: tl.value.survey.assessment.title,
          subtitle: tl.value.survey.assessment.caption,
          median_key: "assessment_median",
          mean_key: "assessment_mean",
        },
        {
          title: tl.value.survey.administration.title,
          subtitle: tl.value.survey.administration.caption,
          median_key: "administration_median",
          mean_key: "administration_mean",
        },
        {
          title: tl.value.survey.workload.title,
          subtitle: tl.value.survey.workload.caption,
          median_key: "workload_median",
          mean_key: "workload_mean",
        },
      ].map(({ title, subtitle, median_key, mean_key }) => ({
        title,
        subtitle,
        data: [
          {
            label: tl.value.ui.median,
            data: surveys.map((s) => s[median_key]),
            color: theme.get("tp-green"),
          },
          {
            label: tl.value.ui.mean,
            data: surveys.map((s) => s[mean_key]),
            color: theme.get("tp-red"),
          },
          {
            label: `${course.owner_code} ${tl.value.ui.mean}`,
            data: programme_average.map((e: any) => e[mean_key]),
            color: "hsla(255, 25%, 59%, 1.0)",
          },
          // {
          //   label: "Chalmers mean",
          //   data: this.chalmers_average.map((e) => e[mean_key]),
          //   color: "#006C5C",
          // },
        ],
      })),
    );

    // useEvent().addListener("keydown", (e) => {
    //   console.log(`useEvent: ${e.key}`);
    // })

    return {
      charts,
      labels,
      comments,
      course,
      answerFrequency,
      tl,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.gap-8
  .p-4.bg-base-200.rounded
    .flex.items-center(id="1")
      h3.pr-2 {{ tl.survey.answer_frequency.title }}
      Key 1
    .text-muted {{ tl.survey.answer_frequency.caption }}
    LineChart(
      :labels="labels",
      :data="answerFrequency",
      :scales="{ yAxis: { min: 0, max: 100 } }",
      :dots="true"
    )

  .p-4.bg-base-200.rounded(v-for="(chart, index) in charts")
    .flex.items-center(:id="String(index + 2)") 
      h3.pr-2 {{ chart.title }}
      Key {{ index + 2 }}
    .text-muted {{ chart.subtitle }}
    LineChart(
      :labels="labels",
      :data="chart.data",
      :scales="{ yAxis: { min: 1, max: 5 } }",
      :dots="true",
      :comments="comments"
    )
</template>
