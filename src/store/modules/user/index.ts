import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import { RootState } from "../../types"
import { UserState } from "./types";


const namespaced: boolean = true;

const state: UserState = {
  user: {
    username: "ilovesshan",
    token: "",
    isLogin: true,
  }
}

const mutations: MutationTree<UserState> = {}
const getters:GetterTree<UserState, RootState> = {}
const actions:ActionTree<UserState, RootState> = {}

const userModule: Module<UserState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions,
};

export default userModule;