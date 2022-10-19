import { ISelectConditions } from "@/views/index/pages/system-monitoring/types";
import service from "./service";


// 查询访问列表
export function selectAccessList(data: ISelectConditions) {
  return service({
    method: "get",
    url: `/loginLog`,
    params: {
      pageSize: data.pageSize,
      pageNum: data.pageNum,
      ...data.condition,
    },
  });
}