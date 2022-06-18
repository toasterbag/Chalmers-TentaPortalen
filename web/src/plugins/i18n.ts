import { defineStore } from "pinia";

interface Translations {
  uor: string;
  irr: string;
}

interface State {
  translations: {
    en: Translations;
    sv: Translations;
  };
}

const en = {
  uor: "Education area representative",
  irr: "Department council representative",
};

const sv = {
  uor: "Utbildningsområdesrepresentant",
  irr: "Institutionsrådsrepresentant",
};

export const useI18n = defineStore("i18n", {
  state: (): State => ({
    translations: {
      en,
      sv,
    },
  }),
});
