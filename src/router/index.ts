
import {
  createRouter,
  createWebHistory,
} from "vue-router"

import type {
  RouteRecordRaw, RouteLocationNormalized,NavigationGuardNext
} from "vue-router"

const Index = ()=> import("@/views/index/index.vue")
const Login = () => import("@/views/login/index.vue")

const routes: RouteRecordRaw[] =[
  {
    path: "/",
    redirect:"/index"
  },
  {
    path:"/login",
    name:"login",
    component: Login,
  },
  {
    path:"/index",
    name:"index",
    component:Index,
  },
];

const router = createRouter({
  history:createWebHistory(),
  routes: routes,
});


router.beforeEach((to: RouteLocationNormalized, from:RouteLocationNormalized, next: NavigationGuardNext) => {
  next();
});


export default router;