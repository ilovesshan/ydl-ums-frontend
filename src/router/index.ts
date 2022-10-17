
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
const Home = () => import("@/views/index/pages/home/index.vue");

const SystemManagement = () => import("@/views/index/pages/system-management/index.vue");
const RoleManagement = () => import("@/views/index/pages/system-management/role-management.vue");
const UserManagement = () => import("@/views/index/pages/system-management/user-management.vue");
const MenuManagement = () => import("@/views/index/pages/system-management/menu-management.vue");


const SystemMonitoring = () => import("@/views/index/pages/system-monitoring/index.vue");
const AccessLog = () => import("@/views/index/pages/system-monitoring/access-log.vue");
const OnlineUser = () => import("@/views/index/pages/system-monitoring/online-user.vue");

const Login = () => import("@/views/login/index.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "index",
    component: Index,
    meta: { title: "首页" },
    children: [
      {
        path: "/",
        redirect: "/home"
      },

      // 首页
      {
        path: "/home",
        name: "home",
        component: Home,
      },

      // 系统管理
      {
        path: "/system-management",
        name: "role-management",
        meta: { title: "系统管理" },
        component: SystemManagement,
        children: [
          {
            path: "/system-management/role-management",
            name: "role-management",
            meta: { title: "角色管理" },
            component: RoleManagement,
          },
          {
            path: "/system-management/user-management",
            name: "user-management",
            meta: { title: "用户管理" },
            component: UserManagement,
          },
          {
            path: "/system-management/menu-management",
            name: "menu-management",
            meta: { title: "菜单管理" },
            component: MenuManagement,
          },
        ]
      },


      // 系统监控
      {
        path: "/system-monitoring",
        name: "system-monitoring",
        meta: { title: "系统监控" },
        component: SystemMonitoring,
        children: [
          {
            path: "/system-monitoring/access-log",
            name: "access-log",
            meta: { title: "访问日志" },
            component: AccessLog,
          },
          {
            path: "/system-monitoring/online-user",
            name: "online-user",
            meta: { title: "在线用户" },
            component: OnlineUser,
          },
        ]
      },
    ]
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
    if (store.getters["auth/isLogin"]) {
      next();
    } else {
      // 有可能是刷新操作 或者是真的没登录过
      const token = cache.getSessionString("token");
      const userInfo = cache.getSessionObject("userInfo");
      if (token && userInfo) {
        // 当前是刷新 将用户信息从新放在vuex
        store.dispatch("auth/saveUserInfo", { userInfo, token });

        // 重新获取用户权限信息
        store.dispatch("auth/saveUserPermissionInfo", store.getters["auth/userId"]);

        next();
      } else {
        next("/login");
      }
    }
  }
});

export default router;