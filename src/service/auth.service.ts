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