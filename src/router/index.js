import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/index.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/register",
    name: "register",
    meta: {
      preventIfAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/chat/:id",
    name: "chat",
    meta: {
      authRequired: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/ChatView/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuth;
  if (to.meta.preventIfAuth && isAuth) return next(from); // prevent authenticated user from accessing login page
  if (to.meta.authRequired && !isAuth)
    return next({
      name: "register",
    });
  // prevent un-authenticated user from going to home dashboard
  next();
});
export default router;
