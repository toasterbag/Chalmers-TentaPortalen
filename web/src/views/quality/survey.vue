<template lang="pug">
.row.justify-content-center.border-bottom
  .col-12.col-md-8.pb-3
    .d-flex.align-items-center(id="1")
      .fs-3.pe-2 Answer Frequency
      Key 1
    .text-muted How many students responded to the survey? (percentage)
    LineChart(
      :labels="labels",
      :data="answerFrequency",
      :colorize="false",
      :dots="true",
      :showLabels="true"
    )

.row.justify-content-center.border-bottom(v-for="(chart, index) in charts")
  .col-12.col-md-8.pb-3
    .d-flex.align-items-center(:id="String((index + 2) % 10)") 
      .fs-3.pe-2 {{ chart.title }}
      Key {{ (index + 2) % 10 }}
    .text-muted {{ chart.subtitle }}
    LineChart(
      :labels="labels",
      :data="chart.data",
      :scales="{ yAxis: { min: 1, max: 5 } }",
      :colorize="false",
      :dots="true",
      :showLabels="true"
    )
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import Http from "../../plugins/http";
import { useTheme } from "../../plugins/theme";

export default defineComponent({
  name: "CourseSurveyAnalyis",

  async setup() {
    const EDITI = ["TKDAT", "TKITE", "TKIEK", "TKELT", "TKMED", "TIDAL", "TIELL", "TIEPL"]

    const divisionColors = new Map([
      ["TKDAT", "#fb8500"],
      ["TKIEK", "#7209b7"],
      ["TKELT", "#ffb703"],
      ["TKITE", "#219ebc"],
      ["TKBIO", "#1d3557"],
      ["TKKEF", "pink"],
      ["TKKMT", "#40916c"],
      ["TKDES", "#c9184a"],
      ["TKTFY", "#444"],
      ["TKTEM", "#444"],
      ["TKSAM", "cyan"],
      ["TKAUT", "#777"],
      ["TKMAS", "#a47148"],
      ["TKARK", "#e5383b"],
      ["TKMED", "#ffb703"],
      ["TKGBS", "blue"],
      ["TKATK", "#e5383b"],

      ["TIEPL", "#f15bb5"],
      ["TIDAL", "#f72585"],
      ["TIELL", "#003566"]

    ])

    const color = (code: string) => {
      const specific = divisionColors.get(code);
      if (specific) {
        return specific;
      }

      // if (code.startsWith("TK")) return "#c1121f11";
      // if (code.startsWith("TI")) return "#f15bb511";
      return "rgba(0,0,0,0.1)"
    }

    const chalmersByYear = await Http.get(`survey/chalmers`);

    const chalmersAverage = Object.values(chalmersByYear);

    const labels = Object.keys(chalmersByYear).skip(1)



    const departments: { [key in string]: any } = await Http.get(`survey/per-department`);

    for (const [, years] of Object.entries(departments)) {
      for (const year of labels) {
        if (!(year in years)) {
          years[year] = null;
        }
      }
    }


    const programmes: { [key in string]: any } = await Http.get(
      `survey/per-programme`,
    );
    for (const [programme, years] of Object.entries(programmes)) {
      for (const year of labels) {
        if (!(year in years)) {
          years[year] = null;
        }
      }
    }

    const answerFrequency = computed(() =>
      [...Object.entries(programmes)
        // .filter(([code]) => code.startsWith("TK"))
        .filter(([code]) => EDITI.includes(code))
        .map(([code, byYear]: [string, any]) => ({
          label: code,
          data: Object
            .entries(byYear)
            .sortBy(([a], [b]) => a.localeCompare(b))
            .filter(([year]) => year !== "2014/2015")
            .map(([year, data]) => data)
            .map((s: any) => (s ?? {})["answer_frequency"]),
          color: color(code)
        })), {
        label: "Chalmers",
        data: chalmersAverage.map((s: any) => s["answer_frequency"]),
        color: "#006C5C",
      },]
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
        data: [...Object.entries(programmes)
          // .filter(([code]) => code.startsWith("TK"))
          .filter(([code]) => EDITI.includes(code))
          .map(([code, byYear]: [string, any]) => ({
            label: code,
            data: Object
              .entries(byYear)
              .sortBy(([a], [b]) => a.localeCompare(b))
              .filter(([year]) => year !== "2014/2015")
              .map(([year, data]) => data)
              .map((s: any) => (s ?? {})[mean_key]),
            color: color(code)
          })), {
          label: "Chalmers",
          data: chalmersAverage.map((s: any) => s[mean_key]),
          color: "#006C5C",
        },]
        // [
        //   {
        //     label: "Median",
        //     data: surveys.map((s) => s[median_key]),
        //     color: theme.get("sp-green"),
        //   },
        //   {
        //     label: "Mean",
        //     data: surveys.map((s) => s[mean_key]),
        //     color: theme.get("sp-red"),
        //   },
        //   {
        //     label: `${course.owner_code} mean`,
        //     data: programme_average.map((e) => e[mean_key]),
        //     color: "hsla(255, 25%, 59%, 1.0)",
        //   },
        //   // {
        //   //   label: "Chalmers mean",
        //   //   data: this.chalmers_average.map((e) => e[mean_key]),
        //   //   color: "#006C5C",
        //   // },
        // ],
      })));


    const onKeydown = (e: KeyboardEvent) => {
      if (!isNaN(Number(e.key))) {
        location.hash = `#${e.key}`;
      }
    }

    document.addEventListener("keydown", onKeydown);
    onUnmounted(() => {
      console.log("remove listener")
      document.removeEventListener("keydown", onKeydown);
    });

    // const res = Http.get("/surveys/by-period")

    return {
      charts,
      labels: labels.map(s => s.replace(/20([0-9]{2})\/20([0-9]{2})/g, "$1/$2")),
      answerFrequency
    }
  }
});
</script>

<style lang="scss" scoped>
.sidebar {
  top: 10vh;
}
</style>
