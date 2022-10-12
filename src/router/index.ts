
import {
  createRouter,
  createWebHistory,
} from "vue-router"

import type {
  RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext
} from "vue-router"

import cache from "@/utils/cache"
import store from "@/store"

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
    if(store.getters["auth/isLogin"]){
      next();
    }else{
      // 有可能是刷新操作 或者是真的没登录过
      const token = cache.getSessionString("token");
      const userInfo = cache.getSessionObject("userInfo");
      if (token && userInfo) {
        // 当前是刷新 将用户信息从新放在vuex
        store.dispatch("auth/saveUserInfo", userInfo);
        next();
      } else {
        next("/login");
      }
    }
  }
});

export default router;