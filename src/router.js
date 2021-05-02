import Vue from "vue";
import Router from "vue-router";

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
          path: "materials",
          name: "course/materials",
          component: () => import("./views/course/materials.vue"),
        },
        {
          path: "survey",
          name: "course/survey",
          component: () => import("./views/course/survey.vue"),
        },
      ],
    },
    {
      path: "/courses/search",
      name: "course-search",
      component: () => import("./views/course-search.vue"),
    },
    {
      path: "/programme/:code",
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
      ],
    },

    {
      path: "/submit-exams",
      name: "submit-exams",
      component: () => import("./views/submit-exams.vue"),
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

export default router;
