import { en } from "./en";
import { sv } from "./sv";

// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = {
  terms: {
    uor: string;
    irr: string;
    sn: string;
    courses: string;
    solution: string;
    exam: string;
    exams: string;
    owner: string;
    programme_plan: string;
    department: string;
    academic_year: string;
    electivity: string;
    master_of_engineering: string;
    engineering_bachelor: string;
    mastersprogramme: string;
    study_period: string;
    academic_council: string;
    survey: string;
  };

  ui: {
    email: string;
    median: string;
    mean: string;
    this_course: string;
    incuded_in_thesis: string;
    download: string;
    missing: string;
    date: string;
    students: string;
    hint: string;
    clear: string;
    other: string;
    stack_bars: string;
    hide_reexams: string;
    values_in_precent: string;
    minimum_responses: string;
    maximum_responses: string;
    min_participants: string;
    max_participants: string;
    start_period: string;
    end_period: string;
    sort_order_hint: string;
    // Sort columns
    course_code: string;
    name: string;
    overall_impression: string;
    respondents: string;
    responses: string;
    answer_frequency: string;
    passrate: string;
    participants: string;
    results: string;
    no_results: string;
  };
  survey: {
    answer_frequency: {
      title: string;
      caption: string;
    };
    overall_impression: {
      title: string;
      caption: string;
    };
    prerequisites: {
      title: string;
      caption: string;
    };
    learning_outcomes: {
      title: string;
      caption: string;
    };
    structure: {
      title: string;
      caption: string;
    };
    teaching: {
      title: string;
      caption: string;
    };
    litterature: {
      title: string;
      caption: string;
    };
    assessment: {
      title: string;
      caption: string;
    };
    administration: {
      title: string;
      caption: string;
    };
    workload: {
      title: string;
      caption: string;
    };
  };
  header: {
    home: string;
    rankings: {
      _: string;
      course_impressions: string;
      course_performance: string;
      programme_impressions: string;
      answer_frequency: string;
    };
    contact: string;
    faq: string;
  };
  footer: {
    code: {
      title: string;
      github: string;
      me: string;
    };
    admin: {
      title: string;
      control_panel: string;
    };
    about: {
      title: string;
      maintained_by: string;
      feedback: string;
    };
  };
  pages: {
    home: {
      title: string;
      greeting_heading: string;
      greeting_content: string;
      courses_with_thesis: string;
      uploaded_exams: string;
      action_find_missing_exams: string;
      news_heading: string;
    };
    course: {
      nav: {
        exam_statistics: string;
        old_theses: string;
        survey_analysis: string;
        old_surveys: string;
      };
      hint_only_turned_in_exams: string;
      avg_failrate: string;
      view_on_student_portal: string;
      no_exams_found: string;
      low_participation: string;
      hint_upload: string;
      hint_minutes: string;
      no_surveys_found: string;
    };
    contact: {
      title: string;
      heading: string;
      caption: string;
    };
    passrate_by_exam_period: {
      title: string;
      heading: string;
      caption: string;
    };
    answer_frequency_by_division: {
      title: string;
      heading: string;
      // caption: string;
    };
    faq: {
      title: string;
      when_is_the_page_updated: {
        title: string;
        answer: string;
      };
      what_is_tento_ergo_sum: {
        title: string;
        answer: string;
      };
    };
    course_performance: {
      title: string;
    };
    course_impressions: {
      title: string;
    };
    programme_impressions: {
      title: string;
    };
    courses_without_thesis: {
      title: string;
    };
  };
};
import { defineStore, PiniaPluginContext } from "pinia";

export type AvailableLocales = "en" | "sv";

interface State {
  locale: AvailableLocales;
  messages: {
    [K in AvailableLocales]: MessageSchema;
  };
}

const getPreferredLanguage = (): AvailableLocales => {
  {
    const lang = localStorage.getItem("tentaportalen-lang");
    if (lang !== null) return lang as AvailableLocales;
  }

  {
    const lang = window.navigator.language;
    if (/^sv/.test(lang)) return "sv";
  }

  return "en";
};

export const useLocalization = defineStore("Localization", {
  state: (): State => ({
    locale: getPreferredLanguage(),
    messages: {
      en,
      sv,
    },
  }),
  actions: {
    setLocale(lang: AvailableLocales) {
      this.locale = lang;
      localStorage.setItem("tentaportalen-lang", lang);
    },
    title(caption: string) {
      return `TentaPortalen | ${caption}`;
    },
  },
  getters: {
    tl: (state) => state.messages[state.locale],
  },
});
