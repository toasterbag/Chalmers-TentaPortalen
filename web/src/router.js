import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
      name: "course",
      props: true,
      component: () => import("./views/course.vue"),
    },
    {
      path: "/exams",
      name: "exams",
      component: () => import("./views/exams.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/admin.vue"),
    },
    {
      path: "*",
      redirect: { name: "home" },
    },
  ],
});
