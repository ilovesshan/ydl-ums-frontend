import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import { RootState } from "../../types"
import { AuthState } from "./types";


const namespaced: boolean = true;

const state: AuthState = {
  user: {
    username: "ilovesshan",
    token: "",
    userDetail: "",
  }
}


const getters: GetterTree<AuthState, RootState> = {}

const mutations: MutationTree<AuthState> = {
  saveUserInfo(state: AuthState, payload: any) {
    const {username, token } = payload;
    state.user.userDetail = payload;
    state.user.username = username;
    state.user.token = token;
  }
}

const actions: ActionTree<AuthState, RootState> = {
  saveUserInfo({ commit }, payload: any) {
    commit("saveUserInfo", payload);

    // 将用户信息保存在localStorage中
    window.localStorage.setItem("token",payload.token);
    window.localStorage.setItem("username",payload.username);
  }
}

const userModule: Module<AuthState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};

export default userModule;  