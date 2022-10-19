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
  },
  onlineUser: {
    list: [],
  }

}

const getters: GetterTree<ISystemMonitoring, RootState> = {
  //返回访问日志列表
  AccessList(state, getters): any[] {
    return state.accessLog.list;
  }
}


const mutations: MutationTree<ISystemMonitoring> = {
  //保存访问日志列表
  saveAccessList(state: ISystemMonitoring, payload: any[]) {
    state.accessLog.list = payload;
  },
}


const actions: ActionTree<ISystemMonitoring, RootState> = {
  // 获取访问日志列表
  selectAccessList({ commit }, payload: ISelectConditions) {
    selectAccessList(payload).then(res => {
      const { code, message, data } = res;
      if (code == 200) {
        console.log(data);
      } else {
        ElMessage({ message, type: 'error' });
      }
    });
    commit("saveAccessList", payload);
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