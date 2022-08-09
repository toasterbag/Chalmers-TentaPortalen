<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { articles } from "../router";

export default defineComponent({
  name: "Home",
  setup() {
    const l = useLocalization();
    const { locale, tl } = storeToRefs(l);
    document.title = l.title(tl.value.pages.home.title);

    return {
      tl,
      locale,
      feed: computed(() => articles(locale.value).slice(0, 4)),
    };
  },
});
</script>

<template lang="pug">
.grid.grid-cols-1.view-margin(class="md:grid-cols-2")
  .col-span-1.border-b-4.border-base-300.mb-8(
    class="md:border-r md:border-b-0 md:px-8 md:mb-0"
  )
    Brand.mb-4.px-2.hidden(class="md:block", size="3rem")

    .px-2.rounded.transition.block
      h2.font-semibold.text-2xl.text-primary {{ tl.pages.home.greeting_heading }}
      p {{ tl.pages.home.greeting_content }}

    //- .mb-2.p-2
    //-   .text-xl.font-bold Courses with at least one thesis/solution
    //-   .text-lg {{ coursesWithThesis }} / {{ courses }} ({{ (coursesWithThesis / courses).mul(100).floor() }}%)

    .mb-2
      AvailableExams

    //- Link.mb-2.p-4.rounded.transition.block.border-2(
    //-   :to="{ name: 'Calendar' }",
    //-   class="hover:bg-gray-200"
    //- )
    //-   h3.text-primary Academic calendar
    //-   p Check out our calendar with important dates such as exam registration and when to register for courses.

    Link.mb-4.p-4.rounded.transition.block.shadow.bg-base-200(
      :to="{ name: 'Contact' }"
    )
      h3.text-primary {{ tl.pages.contact.heading }}
      p.text-base-content {{ tl.pages.contact.caption }}

    Link.p-4.rounded.transition.block.shadow.bg-base-200(
      :to="{ name: 'PassrateByPeriod' }"
    )
      h3.text-primary {{ tl.pages.passrate_by_exam_period.heading }}
      p.text-base-content {{ tl.pages.passrate_by_exam_period.caption }}

  .col-span-1(class="md:px-8")
    h1.font-bold.text-4xl.p-2 {{ tl.pages.home.news_heading }}
    div(v-for="article in feed")
      router-link.mb-2.p-4.rounded.transition.block.bg-base-200(
        v-if="'name' in article",
        :to="{ name: article.name }"
      )
        .text-base-content.text-sm.font-bold {{ article.date }}
        h2.font-semibold.text-2xl.text-primary {{ article.title }}
        p.text-base-content {{ article.summary }}
      .mb-2.p-4.rounded.transition.block(v-else)
        .text-base-content.text-sm.font-bold {{ article.date }}
        h2.font-semibold.text-2xl.text-primary {{ article.title }}
        p.text-base-content {{ article.summary }}
      //- .col-5
</template>
