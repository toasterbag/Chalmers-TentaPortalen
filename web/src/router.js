import Vue from "vue";
import Router from "vue-router";
import { plausible } from "./plugins/plausible";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home.vue"),
    },
    {
      path: "/course/:code",
      component: () => import("./views/course/index.vue"),
      children: [
        {
          path: "",
          name: "course/exam-statistics",
          component: () => import("./views/course/exam-statistics.vue"),
        },
        {
          path: "module/:id",
          name: "course/module",
          component: () => import("./views/course/module.vue"),
        },
        {
          path: "materials",
          name: "course/materials",
          component: () => import("./views/course/materials.vue"),
        },
        {
          path: "survey-analysis",
          name: "course/survey-analysis",
          component: () => import("./views/course/survey-analysis.vue"),
        },
        {
          path: "surveys",
          name: "course/surveys",
          component: () => import("./views/course/surveys.vue"),
        },
      ],
    },
    {
      path: "/courses/search",
      name: "course-search",
      component: () => import("./views/course-search.vue"),
    },
    {
      path: "/programme/:code/:start_year/:end_year",
      component: () => import("./views/programme/index.vue"),
      children: [
        {
          path: "",
          name: "programme/exam-statistics",
          component: () => import("./views/programme/exam-statistics.vue"),
        },
        {
          path: "survey",
          name: "programme/course-survey",
          component: () => import("./views/programme/survey.vue"),
        },
      ],
    },
    {
      path: "/programmes/search",
      name: "programme-search",
      component: () => import("./views/programme-search.vue"),
    },

    {
      path: "/passthrough/presentation",
      name: "passthrough-presentation",
      component: () => import("./views/passthrough/presentation.vue"),
    },

    {
      path: "/admin",
      component: () => import("./views/admin/index.vue"),
      beforeEnter: (to, from, next) => {
        if (!sessionStorage.getItem("password")) {
          next({ name: "login" });
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
          name: "admin/import",
          component: () => import("./views/admin/import.vue"),
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
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () => import("./views/feedback.vue"),
    },
    {
      path: "/analytics",
      name: "analytics",
      component: () => import("./views/analytics.vue"),
    },
    {
      path: "/passrate-by-period",
      name: "passrate-by-period",
      component: () => import("./views/passrate-by-period.vue"),
    },
    {
      path: "/passrate-by-period/:start/:end",
      name: "passrate-by-period-and-year",
      component: () => import("./views/passrate-by-period-and-year.vue"),
    },
    {
      path: "/facts",
      name: "quick-facts",
      component: () => import("./views/quick-facts.vue"),
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("./views/faq.vue"),
    },
    {
      path: "*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  plausible.trackEvent("View", { props: { name: to.name } });
  next();
});

export default router;
