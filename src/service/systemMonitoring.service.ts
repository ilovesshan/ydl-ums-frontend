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

// 删除访问列表
export function deleteAccessByIds(data: string) {
  return service({
    method: "delete",
    url: `/loginLog`,
    params: {
      ids: data,
    },
  });
}

// 导出访问列表
export function exportAccessByIds(data: any[]) {
  return service({
    method: "post",
    url: `/attachment/excel`,
    data,
  });
}