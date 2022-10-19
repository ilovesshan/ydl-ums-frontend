import { RootState } from "@/store/types";
import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import { ElMessage } from "element-plus";

import { ISystemMonitoring } from "./types";

import { selectAccessList } from "@/service/systemMonitoring.service"
import { ISelectConditions } from "@/views/index/pages/system-monitoring/types";


const namespaced: boolean = true;

const state: ISystemMonitoring = {
  accessLog: {
    list: [],
    total: 0,
  },
  onlineUser: {
    list: [],
    total: 0,
  }
}

const getters: GetterTree<ISystemMonitoring, RootState> = {
  //返回访问日志列表
  accessList(state, getters): any[] {
    return state.accessLog.list;
  },

  //返回访问日志列表总条数
  accessTotal(state, getters): number {
    return state.accessLog.total;
  }
}


const mutations: MutationTree<ISystemMonitoring> = {
  //保存访问日志列表
  saveAccessList(state: ISystemMonitoring, payload: any[]) {
    state.accessLog.list = payload;
  },

  // 保存访问日志列表总条数
  saveAccessTotal(state: ISystemMonitoring, payload: number) {
    state.accessLog.total = payload;
  },
}


const actions: ActionTree<ISystemMonitoring, RootState> = {
  // 获取访问日志列表
  selectAccessList({ commit }, payload: ISelectConditions) {
    payload.condition["loginLocaltion"] = "";
    selectAccessList(payload).then(res => {
      const { code, message, data } = res;
      if (code == 200) {
        const { content, totalElements } = data;
        commit("saveAccessList", content);
        commit("saveAccessTotal", totalElements);
      } else {
        ElMessage({ message, type: 'error' });
      }
    });
  }, 
  
  // 删除访问日志列表
  deleteAccessByIds({ commit }, payload: string) {
    payload.condition["loginLocaltion"] = "";
    selectAccessList(payload).then(res => {
      const { code, message, data } = res;
      if (code == 200) {
        const { content, totalElements } = data;
        commit("saveAccessList", content);
        commit("saveAccessTotal", totalElements);
      } else {
        ElMessage({ message, type: 'error' });
      }
    });
  },
}


const systemMonitoringModule: Module<ISystemMonitoring, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};

export default systemMonitoringModule;  