import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import { RootState } from "../../types"
import { IAuthState } from "./types";


const namespaced: boolean = true;

const state: IAuthState = {
  user: {
    username: "ilovesshan",
    token: "",
    userDetail: "",
  }
}


const getters: GetterTree<IAuthState, RootState> = {}

const mutations: MutationTree<IAuthState> = {
  saveUserInfo(state: IAuthState, payload: any) {
    const {username, token } = payload;
    state.user.userDetail = payload;
    state.user.username = username;
    state.user.token = token;
  }
}

const actions: ActionTree<IAuthState, RootState> = {
  saveUserInfo({ commit }, payload: any) {
    commit("saveUserInfo", payload);

    // 将用户信息保存在localStorage中
    window.localStorage.setItem("token",payload.token);
    window.localStorage.setItem("username",payload.username);
  }
}

const userModule: Module<IAuthState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};

export default userModule;  