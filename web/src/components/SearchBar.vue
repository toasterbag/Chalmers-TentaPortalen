<template lang="pug">
.search-wrapper
  .search-box
    .d-flex.align-items-center.px-2
      .fa.fa-search.text.px-2
      .input
        input(
          placeholder="Course code, programme, etc..",
          ref="searchInput",
          v-model="search",
          @input="fetchSuggestions",
          @focus="fetchSuggestions",
          @blur="blur"
        )
      .desktop-only
        .d-flex.align-items-center
          Key Ctrl
          div +
          Key K
    .results.text(v-if="items")
      .pb-4(v-if="loading")
        hr
        Spinner
      div(v-else-if="noResults")
        hr
        .px-4 No results found
      div(v-if="items.programmes.length > 0")
        hr
        .category.px-4.fw-bold Programmes
        .search-item.px-4.py-1(
          v-for="{ code, name_en } in items.programmes",
          @click="gotoProgramme(code)",
          :class="{ selected: code == selectedItem }"
        )
          .text-primary {{ code }}
          .text-truncate.text-size-sm {{ name_en }}
      div(v-if="items.courses.length > 0")
        hr
        .category.px-4.fw-bold Courses
        .search-item.px-4.py-2(
          v-for="{ course_code, name_en, owner_code } in items.courses",
          @click="gotoCourse(course_code)",
          :class="{ selected: course_code == selectedItem }"
        )
          .row
            .col-3.col-sm-2.text-primary.fw-bold {{ course_code }}
            .col-9.col-sm-8.text-truncate {{ name_en }}
            .col-2.fw-bold.desktop-only {{ owner_code }}
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  Ref,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { useAPI } from "../plugins/api";

export default defineComponent({
  name: "SearchBar",
  props: {
    autofocus: {
      default: false,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const api = useAPI();
    const searchInput: Ref<HTMLElement | undefined> = ref(undefined);
    const search = ref("");
    const focus = ref(false);
    const pages = [
      {
        title: "Quality: Course surveys",
        description: "Overview of all course surveys",
        route: { name: "survey-by-programme" },
      },
    ];
    const defaultItems = { pages: [], programmes: [], courses: [] };
    const items: Ref<any> = ref(defaultItems);
    const selectedIndex = ref(0);
    const selectedItem = computed(() => {
      const nProgrammes = items.value.programmes.length;
      const nCourses = items.value.courses.length;
      if (selectedIndex.value < nProgrammes) {
        return items.value.programmes[selectedIndex.value].code;
      } else if (selectedIndex.value < nProgrammes + nCourses) {
        return items.value.courses[selectedIndex.value - nProgrammes]
          .course_code;
      }
      return undefined;
    });

    const gotoProgramme = (code: string) => {
      search.value = "";
      router.push({
        name: "Programme/SurveyAnalysis",
        params: { code },
      });
      items.value = defaultItems;
      emit("blur");
    };
    const gotoCourse = (code: string) => {
      search.value = "";
      router.push({
        name: "Course/ExamStatistics",
        params: { code },
      });
      items.value = defaultItems;
      emit("blur");
    };

    const blur = () => {
      setTimeout(() => {
        items.value = defaultItems;
      }, 200);
      focus.value = false;
      emit("blur");
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        const maxIndex =
          items.value.programmes.length + items.value.courses.length - 1;
        selectedIndex.value = Math.min(maxIndex, selectedIndex.value + 1);
      } else if (e.key === "ArrowUp") {
        selectedIndex.value = Math.max(0, selectedIndex.value - 1);
      } else if (e.key === "Enter" && selectedItem.value !== undefined) {
        const nProgrammes = items.value.programmes.length;
        const nCourses = items.value.courses.length;
        if (selectedIndex.value < nProgrammes) {
          gotoProgramme(selectedItem.value);
        } else if (selectedIndex.value < nProgrammes + nCourses) {
          gotoCourse(selectedItem.value);
        }
        blur();
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", onKeyDown);
      if (props.autofocus) searchInput.value?.focus();
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", onKeyDown);
    });

    const maxProgrammes = 4;
    const maxCourses = 8;

    const loading = ref(false);
    let fetchTimer = setTimeout(() => {}, 0);
    const fetchSuggestions = () => {
      emit("focus");
      focus.value = true;

      clearTimeout(fetchTimer);
      fetchTimer = setTimeout(async () => {
        const term = search.value.toLowerCase();

        if (term.length < 3) {
          items.value = defaultItems;
          return;
        }
        loading.value = true;
        items.value = await api.search(term);
        loading.value = false;
      }, 400);
    };

    const noResults = computed(
      () =>
        focus.value === true &&
        search.value.length >= 3 &&
        loading.value === false &&
        items.value &&
        items.value.programmes.isEmpty() &&
        items.value.courses.isEmpty(),
    );

    return {
      items,
      pages,
      maxProgrammes,
      maxCourses,
      search,
      searchInput,
      selectedIndex,
      selectedItem,
      noResults,
      loading,
      blur,
      gotoProgramme,
      gotoCourse,
      fetchSuggestions,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 4rem;
  width: 100%;
  transition: 0.2s all ease;
  z-index: var(--z-dropdown);
}

.search-box {
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

    &:hover,
    &.selected {
      background-color: rgba(100, 100, 100, 0.06);
    }
  }
}
</style>
