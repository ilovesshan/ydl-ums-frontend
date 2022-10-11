
import {
  createRouter,
  createWebHistory,
} from "vue-router"

import type {
  RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext
} from "vue-router"

import cache from "@/utils/cache"

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

// 简单进行路由拦截
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.fullPath == "/login") {
    // 放过登录
    next();
  } else {
    // 判断有没有登录
    const token = cache.getSessionString("token");
    if (token) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;