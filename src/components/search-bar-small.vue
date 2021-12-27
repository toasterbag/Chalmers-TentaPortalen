<template lang="pug">
.search-wrapper
  .search-box
    .d-flex.align-items-center.px-2
      .fa.fa-search.text.px-2
      .input
        input(
          placeholder="Course code, programme, etc..",
          ref="search_input",
          v-model="search",
          @input="fetch_suggestions",
          @focus="fetch_suggestions",
          @blur="blur"
        )
      .help(v-if="show_help")
        span Search for course code or name, or programme code or name
      //- .badge.bg-primary Alt + s
    .results.text(v-if="items")
      div(v-if="no_results")
        hr
        .px-4 No results found
      div(v-if="items.programmes.length > 0")
        hr
        .category.px-4.fw-bold Programmes
        .search-item.px-4.py-1(
          v-for="{ code, name_en } in items.programmes.take(4)",
          @click="goto_programme(code)"
        )
          .text-primary {{ code }}
          .text-truncate.text-size-sm {{ name_en }}
      div(v-if="items.courses.length > 0")
        hr
        .category.px-4.fw-bold Courses
        .search-item.px-4.py-2(
          v-for="{ course_code, name_en, owner_code } in items.courses.take(8)",
          @click="goto_course(course_code)"
        )
          .row
            .col-2.text-primary.fw-bold {{ course_code }}
            .col-8.text-truncate {{ name_en }}
            .col-2.fw-bold {{ owner_code }}
</template>

<script>
import Http from "../plugins/http";
export default {
  name: "SearchBarSmall",
  data: () => ({
    search: "",
    items: undefined,
    // handler: undefined,
  }),
  // mounted() {
  //   this.handler = (e) => {
  //     console.log(e.key, e.alt);
  //     if (e.alt && e.key == "s") {
  //       this.focus();
  //     }
  //   };
  //   window.addEventListener("onkeydown", this.handler);
  // },
  // destroyed() {
  //   window.removeEventListener("onkeydown", this.handler);
  // },
  computed: {
    no_results() {
      return (
        this.items &&
        this.items.programmes.isEmpty() &&
        this.items.courses.isEmpty()
      );
    },
    show_help() {
      return this.$refs.search_input === document.activeElement && this.search === "";
    }
  },
  methods: {
    blur() {
      setTimeout(() => {
        this.items = undefined;
      }, 200);
    },
    focus() {
      this.$refs.search_input.focus();
    },

    async goto_course(code) {
      this.search = code;
      this.$router.push({
        name: "course/exam-statistics",
        params: { code },
      });
      this.items = undefined;
    },
    async goto_programme(code) {
      this.search = code;
      this.$router.push({
        name: "programme/exam-statistics",
        params: { code },
      });
      this.items = undefined;
    },

    async fetch_suggestions() {
      const term = this.search.toLowerCase();

      if (term.length < 3) {
        this.items = undefined;
        return;
      }
      this.items = await Http.get(`search/${term}`);
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 4rem;
  width: 500px;
}

.search-box {
  z-index: var(--sp-search-box-z);
  position: absolute;
  width: 100%;
  border-radius: 8px;
  background-color: #f8f8f8;
  filter: drop-shadow(1px 2px 4px hsl(220deg 10% 70% / 0.3));
  padding: 1rem 0;

  .input {
    width: 100%;
    input {
      background-color: transparent;
      border: unset;
      outline: unset;
      width: 100%;
    }
  }

  .search-item {
    cursor: pointer;

    &:hover {
      background-color: rgba(100, 100, 100, 0.06);
    }
  }
}
</style>
