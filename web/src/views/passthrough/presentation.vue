<template lang="pug">
div(v-if="this.ready")
  teleport(to="sidebar-right")
    .d-flex.justify-content-end.sticky-top.pt-4
      .sidebar
        div 
          b Examinationsform
        div
          select.form-select(v-model="assessment_filter")
            option(selected, :value="undefined") Alla
            option(value="Tentamen") Tentamen

        br
        div
          b Årskurs
        div
          select.form-select(v-model="grade")
            option(selected, :value="1") 1
            option(:value="2") 2
            option(:value="3") 3

  h1 Civilingenjör
  .row.justify-content-between.mb-2.py-md-0.py-3
    passthrough-chart(
      :labels="years",
      :programmes="cing",
      :comments="comments"
    )
  h1 Högskoleingenjör
  .row.justify-content-between.mb-2.py-md-0.py-3
    passthrough-chart(
      :labels="years",
      :programmes="hing",
      :comments="comments"
    )
  h1 EDIT-I
  .row.justify-content-between.mb-2.py-md-0.py-3
    passthrough-chart(
      :labels="years",
      :programmes="editi",
      :comments="comments"
    )
  h1 Masterprogram
  .row.justify-content-between.mb-2.py-md-0.py-3
    passthrough-chart(
      :labels="years",
      :programmes="masters",
      :comments="comments"
    )
.row.justify-content-center.pt-4(v-else)
  .spinner-border.text-primary(role="status")
    span.visually-hidden Loading...
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "passthrough",
  data: () => ({
    ready: false,
    assessment_filter: undefined,
    grade: 1,
    debounce: 0,
    editi: [],
    cing: [],
    hing: [],
    masters: [],
    years: [],
  }),

  created() {
    this.load();
  },

  beforeRouteUpdate(to, from, next) {
    if (to.name.startsWith("course/")) {
      setTimeout(() => {
        this.load();
      }, 20);
    }
    next();
  },
  watch: {
    assessment_filter() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load();
      }, 500);
    },
    grade() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.load();
      }, 500);
    },
  },

  methods: {
    async load() {
      this.ready = false;
      this.comments = [
        {
          index: "2020/2021",
          comment: "COVID-19",
          color: "rgba(91, 142, 125, 0.3)",
        },
      ];

      const query = {};
      if (this.assessment_filter !== undefined) {
        query.assessment_kind = this.assessment_filter;
      }
      if (this.grade !== undefined) {
        query.grade = this.grade;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "TK",
          },
        });
        this.cing = res.data;
        this.years = res.labels;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "TI",
          },
        });
        this.hing = res.data;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            ...query,
            programme_category: "MP",
          },
        });
        this.masters = res.data;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            programmes: JSON.stringify([
              "TKDAT",
              "TKMED",
              "TKELT",
              "TKITE",
              "TIDAL",
              "TIEPL",
              // Samläser med TIDAL så statistiken är samma
              // "TIELL",
              "TKIEK",
            ]),
          },
        });
        this.editi = res.data;
      }
      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
