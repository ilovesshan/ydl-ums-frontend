
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


const SystemMonitoring = () => import("@/views/index/pages/system-monitoring/index.vue");
const AccessLog = () => import("@/views/index/pages/system-monitoring/access-log.vue");
const OnlineUser = () => import("@/views/index/pages/system-monitoring/online-user.vue");

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
    children:[
      {
        path:"/index",
        redirect:"/index/home"
      },

      // 首页
      {
        path: "/index/home",
        name: "home",
        component: Home,
      },

      // 系统管理
      {
        path: "/index/system-management/",
        name: "role-management",
        component: SystemManagement,
        children:[
          {
            path: "/index/system-management/role-management",
            name: "role-management",
            component: RoleManagement,
          },
          {
            path: "/index/system-management/user-management",
            name: "user-management",
            component: UserManagement,
          },
        ]
      },


      // 系统监控
      {
        path: "/index/system-monitoring/",
        name: "system-monitoring",
        component: SystemMonitoring,
        children:[
          {
            path: "/index/system-monitoring/access-log/",
            name: "access-log",
            component: AccessLog,
          }, 
          {
            path: "/index/system-monitoring/online-user",
            name: "online-user",
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
  console.log(to);
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