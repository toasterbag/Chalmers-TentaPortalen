import { useAPI } from "@plugins/api";
import { Profile } from "@plugins/api/types";
import { createRouter, createWebHistory, RouteLocationRaw } from "vue-router";
import { usePlausible } from "./plugins/plausible";
import { RouteRecordRaw } from "vue-router";
import {
  AvailableLocales,
  MessageSchema,
  useLocalization,
} from "@plugins/localization";
import { storeToRefs } from "pinia";

type NewsItem = {
  title: string;
  summary: string;
  date: string;
};
type NewsArticle = NewsItem & { name: string };

export const articles = (
  locale: AvailableLocales,
): Array<NewsArticle | NewsItem> => [
  {
    title: "Changelog 22.8",
    summary:
      locale === "en"
        ? "In preparation for the new year we have added some new features. Find out more about them here."
        : "Inför det nya läsåret har vi introducerat några nya funktioner, läs mer här.",
    date: "2022-08-09",
    name: "Changelog-22-8",
  },
  {
    title: locale === "en" ? "Exam results for SP4" : "Tentamensresultat LP4",
    summary:
      locale === "en"
        ? "The results from the June exams are in, how did your courses perform?"
        : "Resultaten för LP4 tentorna är nu inrapporterade.",
    date: "2022-07-02",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,

  routes: [
    {
      path: "/:lang",
      beforeEnter(to, from, next) {
        if (to.params.lang !== "en" && to.params.lang !== "sv") {
          to.params.lang = "en";
          useLocalization().setLocale(to.params.lang as any);
          next(to);
          return;
        }
        useLocalization().setLocale(to.params.lang as any);
        next();
      },
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "course/:code",
          props: true,
          component: () => import("./views/course/Index.vue"),
          children: [
            {
              path: "",
              name: "Course/ExamStatistics",
              props: true,
              component: () => import("./views/course/ExamStatistics.vue"),
            },
            {
              path: "materials",
              name: "Course/Materials",
              props: true,
              component: () => import("./views/course/Materials.vue"),
            },
            {
              path: "survey-analysis",
              name: "Course/SurveyAnalysis",
              props: true,
              component: () => import("./views/course/SurveyAnalysis.vue"),
            },
            {
              path: "surveys",
              name: "Course/Surveys",
              props: true,
              component: () => import("./views/course/Surveys.vue"),
            },
          ],
        },
        {
          path: "rankings/course-impressions",
          name: "CourseImpressionRankings",
          component: () =>
            import("./views/rankings/CourseImpressionRankings.vue"),
        },
        {
          path: "rankings/course-performance",
          name: "CoursePerformanceRankings",
          component: () =>
            import("./views/rankings/CoursePerformanceRankings.vue"),
        },
        {
          path: "rankings/programme",
          name: "ProgrammeRankings",
          component: () => import("./views/rankings/ProgrammeRankings.vue"),
        },
        {
          path: "rankings/answer-frequency",
          name: "AnswerFrequencyRankings",
          component: () => import("./views/rankings/AnswerFrequency.vue"),
        },
        {
          path: "programme/:code",
          component: () => import("./views/programme/index.vue"),
          children: [
            {
              path: "survey",
              name: "Programme/SurveyAnalysis",
              props: true,
              component: () => import("./views/programme/SurveyAnalysis.vue"),
            },
          ],
        },
        {
          path: "passthrough/presentation",
          name: "passthrough-presentation",
          component: () => import("./views/passthrough/presentation.vue"),
        },

        {
          path: "passthrough/masters",
          name: "passthrough-masters",
          component: () => import("./views/passthrough/master.vue"),
        },

        {
          path: "quality/survey",
          name: "survey-by-programme",
          component: () => import("./views/quality/survey.vue"),
        },

        {
          path: "analytics",
          name: "analytics",
          component: () => import("./views/admin/analytics.vue"),
        },

        {
          path: "admin",
          component: () => import("./views/admin/index.vue"),
          beforeEnter: (to, from, next) => {
            const api = useAPI();
            if (api.profile && api.profile.roles.includes("Admin")) {
              return next();
            }
            next({ name: "SignIn" });
          },
          children: [
            {
              path: "alerts",
              name: "admin/alerts",
              component: () => import("./views/admin/alerts.vue"),
            },
            {
              path: "import",
              name: "Admin/Import",
              component: () => import("./views/admin/ImportExams.vue"),
            },
            {
              path: "upload",
              name: "Admin/Upload",
              component: () => import("./views/admin/UploadExam.vue"),
            },
            {
              path: "verify-exams",
              name: "admin/verify-exams",
              component: () => import("./views/admin/verify-exam.vue"),
            },
            {
              path: "feedback",
              name: "admin/feedback",
              component: () => import("./views/admin/feedback.vue"),
            },
            {
              path: "periods",
              name: "admin/periods",
              component: () => import("./views/admin/periods.vue"),
            },
          ],
        },

        {
          path: "courses-without-thesis",
          name: "CoursesWithoutThesis",
          component: () => import("./views/quality/CoursesWithoutThesis.vue"),
        },
        {
          path: "sign-in",
          name: "SignIn",
          component: () => import("./views/SignIn.vue"),
        },
        {
          path: "feedback",
          name: "feedback",
          component: () => import("./views/Feedback.vue"),
        },

        {
          path: "passrate-by-period",
          name: "PassrateByPeriod",
          component: () => import("./views/PassrateByPeriod.vue"),
        },
        {
          path: "faq",
          name: "FAQ",
          component: () => import("./views/FAQ.vue"),
        },
        {
          path: "dictionary",
          name: "Dictionary",
          component: () => import("./views/Dictionary.vue"),
        },
        {
          path: "contact",
          name: "Contact",
          component: () => import("./views/Contact.vue"),
        },
        {
          path: "calendar",
          name: "Calendar",
          component: () => import("./views/Calendar.vue"),
        },
        {
          path: "news",
          name: "News",
          component: () => import("./views/articles/index.vue"),

          children: [
            {
              path: "changelog-22-8",
              name: "Changelog-22-8",
              component: () =>
                import("./views/articles/2022-08-01.Changelog.vue"),
            },
          ],
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      redirect: { path: "en" },
    },
  ],
});

// const availableLanguages = new Set(["en", "sv"]);
// router.beforeEach((to, from, next) => {
//   usePlausible().trackEvent("View", { props: { name: String(to.name) } });

//   let language = to.params.lang as string;
//   if (!language || !availableLanguages.has(language)) {
//     language = "en";
//   }
//   useLocalization().setLocale(language as "en" | "sv");

//   next();
// });

type Link = {
  title: string;
  icon?: string;
  location?: RouteLocationRaw;
  children?: Array<Link>;
};

export const headerLinks = (tl: MessageSchema) => [
  {
    title: tl.header.home,
    icon: "fa-home",
    location: { name: "Home" },
  },
  {
    title: tl.header.rankings._,
    icon: "fa-chart-bar",
    children: [
      {
        title: tl.header.rankings.course_impressions,
        location: { name: "CourseImpressionRankings" },
      },
      {
        title: tl.header.rankings.course_performance,
        location: { name: "CoursePerformanceRankings" },
      },
      {
        title: tl.header.rankings.programme_impressions,
        location: { name: "ProgrammeRankings" },
      },
      {
        title: tl.header.rankings.answer_frequency,
        location: { name: "AnswerFrequencyRankings" },
      },
    ],
  },
  {
    title: tl.header.contact,
    icon: "fa-book",
    location: { name: "Contact" },
  },
  // {
  //   title: "Academic calendar",
  //   icon: "fa-calendar",
  //   location: { name: "Calendar" },
  // },

  {
    title: tl.header.faq,
    icon: "fa-question",
    location: { name: "FAQ" },
  },
];
