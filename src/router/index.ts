import {
  createRouter,
  createWebHistory,
} from "vue-router"

import type {
  RouteRecordRaw, RouteLocationNormalized,NavigationGuardNext
} from "vue-router"

const Index = ()=> require("@/views/index")
const Login = () => require("@/views/login")

const routes: RouteRecordRaw[] =[
  {
    path:"/",
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