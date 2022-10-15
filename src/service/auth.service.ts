import service from "./service";

import type { ILoginUserInfo } from "@/views/login/loginTypes"


// 用户登录
export function login(data: ILoginUserInfo) {
  return service({
    method: "post",
    url: "/login",
    data,
  });
}

// 获取用户角色权限信息
export function permission(userId: number) {
  return service({
    method: "post",
    url: `/permission/${userId}`,
  });
}


// 用户退出登录
export function logout() {
  return service({
    method: "post",
    url: "/logout",
  });
}