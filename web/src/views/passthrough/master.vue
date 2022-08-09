<template lang="pug">
div
  teleport(to="#sidebar-right")
    .flex.justify-content-end.sticky-top.pt-4
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

  .mt-4
    h1 Data
    .row.justify-between(v-if="!TKDAT.isEmpty()")
      passthrough-chart(
        :labels="years",
        :programmes="TKDAT",
        :comments="comments",
        :colorize="true"
      )
    Spinner(v-else)

  .mt-4
    h1 IT
    .row.justify-between(v-if="!TKITE.isEmpty()")
      passthrough-chart(
        :labels="years",
        :programmes="TKITE",
        :comments="comments",
        :colorize="true"
      )
    Spinner(v-else)

  .mt-4
    h1 Industriell ekonomi
    .row.justify-between(v-if="!TKIEK.isEmpty()")
      passthrough-chart(
        :labels="years",
        :programmes="TKIEK",
        :comments="comments",
        :colorize="true"
      )
    Spinner(v-else)

  .mt-4
    h1 Elektro
    .row.justify-between(v-if="!TKELT.isEmpty()")
      passthrough-chart(
        :labels="years",
        :programmes="TKELT",
        :comments="comments",
        :colorize="true"
      )
    Spinner(v-else)
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
    TKDAT: [],
    TKITE: [],
    TKIEK: [],
    TKELT: [],
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
        this.years = res.labels;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            programmes: JSON.stringify(["MPCSN", "MPHPC", "MPALG"]),
          },
        });
        this.TKDAT = res.data;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            programmes: JSON.stringify(["MPSOF", "MPIDE", "MPDSC"]),
          },
        });
        this.TKITE = res.data;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            programmes: JSON.stringify(["MPMEI", "MPQOM", "MPSCM"]),
          },
        });
        this.TKIEK = res.data;
      }

      {
        let res = await Http.get(`passthrough/category`, {
          query: {
            programmes: JSON.stringify([
              "MPBME",
              "MPCOM",
              "MPEPO",
              "MPEES",
              "MPWPS",
            ]),
          },
        });
        this.TKELT = res.data;
      }

      this.ready = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
