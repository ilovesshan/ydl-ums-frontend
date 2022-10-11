
import {
  createRouter,
  createWebHistory,
} from "vue-router"

import store from "@/store/index"

import type {
  RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext
} from "vue-router"

const Index = () => import("@/views/index/index.vue")
const Login = () => import("@/views/login/index.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

  console.log(to);
  console.log(from);
  
  if (to.fullPath == "/login") {
    // 放过登录
    next();
  } else {
    // 判断有没有登录
    const token = window.localStorage.getItem("token");
    if (token) {
      console.log(store.state.auth.user.token);
      next();
    } else {
      next("/login");
    }
  }
});

export default router;