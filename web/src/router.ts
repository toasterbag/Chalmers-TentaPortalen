import { createRouter, createWebHistory, RouteLocationRaw } from "vue-router";
import { usePlausible } from "./plugins/plausible";

export const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,

  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/course/:code",
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
      path: "/rankings/course-impressions",
      name: "CourseImpressionRankings",
      component: () => import("./views/CourseImpressionRankings.vue"),
    },
    {
      path: "/rankings/course-performance",
      name: "CoursePerformanceRankings",
      component: () => import("./views/CoursePerformanceRankings.vue"),
    },
    {
      path: "/rankings/programme",
      name: "ProgrammeRankings",
      component: () => import("./views/ProgrammeRankings.vue"),
    },
    {
      path: "/programme/:code",
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
      path: "/passthrough/presentation",
      name: "passthrough-presentation",
      component: () => import("./views/passthrough/presentation.vue"),
    },

    {
      path: "/passthrough/masters",
      name: "passthrough-masters",
      component: () => import("./views/passthrough/master.vue"),
    },

    {
      path: "/quality/survey",
      name: "survey-by-programme",
      component: () => import("./views/quality/survey.vue"),
    },

    {
      path: "/analytics",
      name: "analytics",
      component: () => import("./views/admin/analytics.vue"),
    },

    {
      path: "/admin",
      component: () => import("./views/admin/index.vue"),
      beforeEnter: (to, from, next) => {
        if (!sessionStorage.getItem("password")) {
          next({ name: "SignIn" });
        } else {
          next();
        }
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
      path: "/sign-in",
      name: "SignIn",
      component: () => import("./views/SignIn.vue"),
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () => import("./views/Feedback.vue"),
    },

    {
      path: "/passrate-by-period",
      name: "PassrateByPeriod",
      component: () => import("./views/PassrateByPeriod.vue"),
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => import("./views/FAQ.vue"),
    },
    {
      path: "/glossary",
      name: "glossary",
      component: () => import("./views/glossary.vue"),
    },
    {
      path: "/reports/:slug",
      name: "reports",
      component: () => import("./views/reports/index.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  usePlausible().trackEvent("View", { props: { name: String(to.name) } });
  next();
});

type Link = {
  title: string;
  icon?: string;
  location?: RouteLocationRaw;
  children?: Array<Link>;
};

export const headerLinks: Array<Link> = [
  {
    title: "Home",
    icon: "fa-home",
    location: { name: "Home" },
  },
  {
    title: "Passrate by exam period",
    icon: "fa-chart-line",
    location: { name: "PassrateByPeriod" },
  },

  {
    title: "Rankings",
    icon: "fa-chart-bar",
    children: [
      {
        title: "Course impressions",
        location: { name: "CourseImpressionRankings" },
      },
      {
        title: "Course performance",
        location: { name: "CoursePerformanceRankings" },
      },
      {
        title: "Programmes",
        location: { name: "ProgrammeRankings" },
      },
    ],
  },

  {
    title: "FAQ",
    icon: "fa-question",
    location: { name: "FAQ" },
  },
];
