import {
  createRouter,
  createWebHashHistory,
} from "vue-router"

import type {
  RouteRecordRaw, RouteLocationNormalized,NavigationGuardNext
} from "vue-router"


const routes: RouteRecordRaw[] = new Array();

const router = createRouter({
  history:createWebHashHistory(),
  routes: routes,
});


router.beforeEach((to: RouteLocationNormalized, from:RouteLocationNormalized, next: NavigationGuardNext) => {
  next();
});


export default router;