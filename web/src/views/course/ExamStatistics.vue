<template lang="pug">
.row.d-flex.justify-content-center
  .col-10.col-md-8

    .d-flex.align-items-center.pb-2
      div.pe-4(v-for="{ name, module_id } in modules" @click="setModule(module_id)")
        .fw-bold.uppercase.text-purple.clickable(:class="module_id === activeModule.module_id ? activeModuleClasses : {}") {{ module_id }}: {{ name }}
  .col-10.col-md-8
    .row.justify-content-between.py-md-0.py-3(v-if="results.isEmpty()")
      .fs-2.text-center No exams found
    div(v-else)
      .row.justify-content-center.pt-2
        .col-12
          ExamBarChart(
            :exams="results.map((e) => e).reverse()"
            :gradingSystem="gradingSystem"
          )
      .row.justify-content-between.py-2
        .col-md-2.ps-4
          div Avg. failrate: {{ averageFailrate }}%
        .col-md-10
          .d-flex.justify-content-end
            .form-check.pe-4(v-if="results.length > 3")
              input#hide-reexams.form-check-input(
                type="checkbox",
                v-model="hideReexams"
              )
              label.form-check-label(for="hide-reexams")
                | Hide re-exams
            .form-check(
              v-else,
              v-tooltip="{ placement: 'top', title: 'Can only hide re-exams when there are more than 3 assesments' }"
            )
              input#hide-reexams.form-check-input(
                type="checkbox",
                disabled,
                value="false"
              )
              label.form-check-label(for="hide-reexams")
                | Hide re-exams
            .form-check.pe-4
              input#stack-bars.form-check-input(
                type="checkbox",
                v-model="stackBars"
              )
              label.form-check-label(for="stack-bars")
                | Stack bars
            .form-check
              input#bars-percent.form-check-input(
                type="checkbox",
                :disabled="!stackBars",
                v-model="displayValuesAsPercent"
              )
              label.form-check-label(for="bars-percent")
                | Values as percent

      .tenta-table.py-3
        .row(v-if="hasLowParticipation")
          .col-12.text-accent Some exams have low participation ( n &lt; 20 ) and may have rounding errors.

        .row.header
          .col-3.col-md-2 Date
          .col-2.text-end U
          .col-2.text-end 3
          .col-2.text-end 4
          .col-1.col-md-2.text-end 5
          .col-2.text-end Students

        .row(v-for="exam in results", :key="exam.date")
          .col-3.col-md-2 {{ exam.date }}
          .col-2.text-end(:class="{ 'text-red': exam.percent.failed >= 50 }") {{ exam.failed }}{{ unit }}
          .col-2.text-end {{ exam.three }}{{ unit }}
          .col-2.text-end {{ exam.four }}{{ unit }}
          .col-1.col-md-2.text-end {{ exam.five }}{{ unit }}
          .col-2.text-end {{ exam.total }}
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import { usePreferences } from "../../plugins/preferences";
import { storeToRefs } from "pinia";
import { useAPI } from "../../plugins/api";

export default defineComponent({
  name: "CourseExamStatistics",
  props: {
    code: {
      required: true,
      type: String,
    }
  },
  async setup(props) {
    const api = useAPI();

    const { hideReexams, stackBars, displayValuesAsPercent, unit } = storeToRefs(usePreferences());
    const moduleId: Ref<undefined | string> = ref(undefined);

    // const allExams = ref(await api.fetchExams(props.code, { primariesOnly: hideReexams.value }));
    let modules = await api.fetchModules(props.code, { onlyPrimaries: hideReexams.value });
    const activeModule = ref(modules.find(m => m.name.toLowerCase().includes("tentamen")) ?? modules[0])

    watch(hideReexams, async () => {
      modules = await api.fetchModules(props.code, { onlyPrimaries: hideReexams.value });
      activeModule.value = modules.find(m => m.module_id == activeModule.value.module_id) ?? modules[0];
    })

    const gradingSystem = computed(() => activeModule.value.grading_system);

    const results = computed(() => {
      if (displayValuesAsPercent.value) {
        return activeModule.value.results.map((e) => Object.assign({}, e, e.percent));
      }
      return activeModule.value.results;
    })

    const hasLowParticipation = computed(() => activeModule.value.results.some((e: any) => e.total < 20))
    const averageFailrate = computed(() =>
      activeModule.value.results
        .map((e: any) => e.percent.failed)
        .average()
        .round()
    )

    const setModule = (moduleId: string) => {
      activeModule.value = modules.find(m => m.module_id == moduleId) ?? modules[0];
    }

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
        'border-bottom': true,
        'border-3': true,
        'border-purple': true,
      },
      setModule,
    }
  }
});
</script>

<style lang="scss" scoped>
@media (max-width: 575.98px) {
  .tenta-table {
    overflow-x: auto;
    & > * {
      left: 0px;
      min-width: 500px;
    }
  }
}
</style>
