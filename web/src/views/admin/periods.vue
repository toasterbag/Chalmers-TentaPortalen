<template lang="pug">
div(v-if="this.ready")
  .row.justify-content-start.pt-2
    .col-md-6
      sp-select(
        v-model="input.type",
        :values="period_types",
        label="Type",
        caption="Tip: Enter the type and start date first and it will try and guess the period"
      )
    .col-md-6
      sp-select(
        v-model="input.study_period",
        :values="study_periods",
        label="Study Period"
      )
    .col-md-2
      label.form-label Start
      input.form-control(
        v-model="input.start",
        @input="guessPeriod",
        placeholder="yyyy-MM-dd"
      )
    .col-md-2
      label.form-label End
      input.form-control(v-model="input.end", placeholder="yyyy-MM-dd")
  .flex.justify-content-end
    .btn.bg-primary(@click="submit") Add
  .tenta-table.p-md-5.py-3
    .row.header
      .col-3 Title
      .col-2 Start
      .col-2 End

    .row.align-items-center(
      v-for="(period, index) in displayPeriods",
      :key="period.start"
    )
      .col-3 {{ period.name }}
      .col-2 {{ period.start }}
      .col-2 {{ period.end }}
      .col-5.text-end
        .btn.bg-error(@click="remove(index)") Delete
</template>

<script>
import Http from "../../plugins/http";
import { format, nextSaturday } from "date-fns";

export default {
  name: "course",
  data: () => ({
    ready: false,
    periods: [],
    period_types: ["Exams", "Re-exams", "Exam Sign-ups"],
    study_periods: [
      "Study period 1",
      "Study period 2",
      "Study period 3",
      "Study period 4",
      "August Re-exams",
    ],

    input: {
      study_period: "",
      type: "",
      start: "",
      end: "",

      suggestions: [],
    },
  }),

  created() {
    this.load();
  },
  computed: {
    displayPeriods() {
      return this.periods.map((e) => ({
        name: e.name,
        start: format(new Date(e.start), "yyyy-MM-dd"),
        end: format(new Date(e.end), "yyyy-MM-dd"),
      }));
    },
  },
  methods: {
    async load() {
      this.periods = await Http.get(`periods`);

      this.ready = true;
    },
    updateSuggestions() {
      const suggestions = [
        "August Re-exams",
        "Study period 1 - Exams",
        "Study period 2 - Exams",
        "Study period 3 - Exams",
        "Study period 4 - Exams",
        "October - Re-Exams",
        "Winter - Re-Exams",
        "Easter - Re-Exams",
        "June - Re-Exams",

        "Exam sign-up",
      ];
      this.input.suggestions = suggestions.filter((s) =>
        s.includes(this.input.name),
      );
    },
    guessPeriod() {
      if (this.input.name != "") {
        return;
      }

      const date = new Date(this.input.start);
      console.log(date);
      if (date.getMonth(8)) {
        this.input.name = "August Re-exams";
        let next = nextSaturday(date);
        next = nextSaturday(next);
        this.input.end = format(next, "yyyy-MM-dd");
      } else if (date.getMonth(10) && date.getDate() < 20) {
        this.input.name = "October - Re-Exams";
      } else if (date.getMonth(10) && date.getDate() >= 20) {
        this.input.name = "Study period 1 - Exams";
      }
    },
    async submit() {
      const period = {
        name: this.input.name,
        start: new Date(this.input.start),
        end: new Date(this.input.end),
      };
      await Http.post(`periods`, {
        body: period,
      });
      this.input = {
        name: "",
        start: "",
        end: "",

        suggestions: [],
      };
      this.periods.push(period);
    },
    async remove(index) {
      const res = await this.$dialog.open("confirm", {
        message: "Do you really want to delete this period?",
      });
      if (res) {
        await Http.delete(`periods`, {
          query: this.periods[index],
        });
        this.periods.splice(index, 1);
      }
    },
  },
};
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
