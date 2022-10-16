import service from "./service";


// 根据ID查用户信息
export function selectById(userId: number) {
  return service({
    method: "get",
    url:`/user/${userId}`,
  });
}