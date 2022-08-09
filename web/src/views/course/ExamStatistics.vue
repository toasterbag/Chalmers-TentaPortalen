<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { usePreferences } from "../../plugins/preferences";
import { useAPI } from "../../plugins/api";
import { storeToRefs } from "pinia";
import { useLocalization } from "../../plugins/localization";

export default defineComponent({
  name: "CourseExamStatistics",
  props: {
    code: {
      required: true,
      type: String,
    },
  },
  async setup(props) {
    const api = useAPI();
    const { tl } = storeToRefs(useLocalization());
    const { hideReexams, stackBars, displayValuesAsPercent, unit } =
      storeToRefs(usePreferences());
    const moduleId: Ref<undefined | string> = ref(undefined);
    // const allExams = ref(await api.fetchExams(props.code, { primariesOnly: hideReexams.value }));
    let modules = await api.fetchModules(props.code, {
      onlyPrimaries: hideReexams.value,
    });
    const activeModule = ref(
      modules.find((m) => m.name.toLowerCase().includes("tentamen")) ??
        modules[0],
    );
    watch(hideReexams, async () => {
      modules = await api.fetchModules(props.code, {
        onlyPrimaries: hideReexams.value,
      });
      activeModule.value =
        modules.find((m) => m.module_id == activeModule.value.module_id) ??
        modules[0];
    });
    const gradingSystem = computed(() => activeModule.value.grading_system);
    const results = computed(() => {
      if (displayValuesAsPercent.value) {
        return activeModule.value.results.map((e) =>
          Object.assign({}, e, e.percent),
        );
      }
      return activeModule.value.results;
    });
    const hasLowParticipation = computed(() =>
      activeModule.value.results.some((e: any) => e.total < 20),
    );
    const averageFailrate = computed(() =>
      activeModule.value.results
        .map((e: any) => e.percent.failed)
        .average()
        .round(),
    );
    const setModule = (moduleId: string) => {
      activeModule.value =
        modules.find((m) => m.module_id == moduleId) ?? modules[0];
    };
    return {
      hideReexams,
      stackBars,
      displayValuesAsPercent,
      unit,
      hasLowParticipation,
      averageFailrate,
      modules,
      moduleId,
      results,
      gradingSystem,
      activeModule,
      activeModuleClasses: {
        "border-b-2": true,
        "border-purple": true,
      },
      setModule,
      tl,
    };
  },
});
</script>

<template lang="pug">
div
  .pt-2.mb-4
    .overflow-x-scroll
      .flex.items-center.gap-4(class="w-[500px] md:w-full")
        .tab-purple(
          v-for="{ name, module_id } in modules",
          @click="setModule(module_id)"
        )
          .font-bold.uppercase.px-4.text-purple.cursor-pointer(
            :class="module_id === activeModule.module_id ? activeModuleClasses : {}"
          ) {{ module_id }}: {{ name }}
  .flex.flex-col.gap-8
    .row.justify-between.py-md-0.py-3(v-if="results.isEmpty()")
      .fs-2.text-center {{ tl.pages.course.no_exams_found }}
    div(v-else)
      .text-lg.my-2
        span.font-bold {{ tl.ui.hint }}:&nbsp;
        span {{ tl.pages.course.hint_only_turned_in_exams }}
      div
        .p-4.bg-base-200.rounded
          ExamBarChart(
            :exams="results.map((e) => e).reverse()",
            :gradingSystem="gradingSystem"
          )
        .flex.items-center.justify-between.py-4
          div
            div {{ tl.pages.course.avg_failrate }}: {{ averageFailrate }}%
          .flex.gap-4.py-2.flex-col(class="lg:flex-row")
            .flex.gap-2.items-center.justify-between
              span {{ tl.ui.hide_reexams }}
              RetroSwitch(v-model="hideReexams")
            .flex.gap-2.items-center.justify-between
              span {{ tl.ui.stack_bars }}
              RetroSwitch(v-model="stackBars")
            .flex.gap-2.items-center.justify-between
              span {{ tl.ui.values_in_precent }}
              RetroSwitch(v-model="displayValuesAsPercent")

    .pt-2(v-if="hasLowParticipation")
      .text-accent {{ tl.pages.course.low_participation }}

    .overflow-x-scroll
      table.tp-table.py-3
        thead
          tr
            th {{ tl.ui.date }}
            th.text-end U
            th.text-end 3
            th.text-end 4
            th.text-end 5
            th.text-end {{ tl.ui.students }}
        tbody
          tr(v-for="exam in results", :key="exam.date")
            td {{ exam.date }}
            td.text-end(:class="{ 'text-red': exam.percent.failed >= 50 }") {{ exam.failed }}{{ unit }}
            td.text-end {{ exam.three }}{{ unit }}
            td.text-end {{ exam.four }}{{ unit }}
            td.text-end {{ exam.five }}{{ unit }}
            td.text-end {{ exam.total }}
</template>
