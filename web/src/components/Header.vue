<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { computed } from "@vue/reactivity";
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAPI } from "../plugins/api";
import { headerLinks } from "../router";

export default defineComponent({
  name: "Header",
  setup() {
    const api = useAPI();
    const route = useRoute();
    const { isSignedIn } = storeToRefs(api);
    const { locale, tl } = storeToRefs(useLocalization());

    const menuElement: Ref<HTMLElement | undefined> = ref(undefined);
    type Menu = "Main" | "Language";
    const currentMenu: Ref<Menu | undefined> = ref(undefined);
    const openMenu = (name: Menu) => (currentMenu.value = name);
    onClickOutside(menuElement, () => (currentMenu.value = undefined));
    console.log(route.fullPath);

    return {
      isSignedIn,
      signOut: api.signOut,
      links: computed(() => headerLinks(tl.value)),
      openMenu,
      menuElement,
      currentMenu,
      locale,
      enUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/en/")),
      svUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/sv/")),
    };
  },
});
</script>

<template lang="pug">
.view-margin.mb-4
  .flex.justify-between.items-center.p-4
    .flex.gap-1.items-center
      //- img.h-10.w-10.mr-8(src="../assets/logo.png")
      div(v-for="{ title, location, children } in links")
        .relative.group(v-if="children")
          .p-2.font-semibold {{ title }}
            .fa.fa-caret-down.pl-2
          .absolute.top-10.hidden.bg-base-200.w-64.z-popup.shadow(
            class="group-hover:block"
          )
            Link.block.p-4.text-base-content.flex.items-center(
              v-for="{ title, location } in children",
              class="hover:bg-base-300",
              :to="location"
            )
              .text-base-content.fa.fa-chevron-right.pr-4(class="!no-underline")
              .text-base-content {{ title }}
        Link.font-semibold.p-2.text-base-content(v-else, :to="location") {{ title }}
    .flex.gap-4.items-center
      div(class="w-[500px] md:w-[400px] lg:w-[500px]")
        SearchBar
      .relative(data-highlight="menu")
        .rounded-full.shadow.bg-base-200.w-10.h-10.cursor-pointer.transition(
          class="hover:bg-base-300",
          @click="openMenu('Main')"
        )
          .center.fa.fa-ellipsis-vertical.text-lg
        .absolute.top-16.right-0.w-56.shadow.bg-base-200.z-popup(
          ref="menuElement"
        )
          ul.menu(v-show="currentMenu === 'Main'")
            li
              .flex.justify-between.items-center
                div Theme
                ThemeSwitch
            li
              .flex.justify-between.items-center(@click="openMenu('Language')")
                div Language
                .fa.fa-language.text-2xl
          ul.menu(v-show="currentMenu === 'Language'")
            li
              a.flex.justify-between.items-center(:href="svUrl", hreflang="sv")
                div Svenska
                img(src="../assets/SE.svg")
            li
              a.flex.justify-between.items-center(:href="enUrl", hreflang="en")
                div English
                img(src="../assets/GB.svg")

    //- div(v-if="!isSignedIn")
    //-   Link(:to="{ name: 'SignIn' }")
    //-     .btn Sign in
    //- div(v-else)
    //-   .btn.bg-accent(@click="signOut") Sign out
</template>
