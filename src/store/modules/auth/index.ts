import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import type { ILoginUserInfo } from "@/views/login/loginTypes"
import type { RootState } from "../../types"
import type { IAuthState } from "./types";

import { login } from "@/service/auth.service";
import router from "@/router/index"
import { ElMessage } from "element-plus"; 

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
  // 保存用户信息
  saveUserInfo({ commit }, payload: any) {
    commit("saveUserInfo", payload);
    // 将用户信息保存在localStorage中
    window.localStorage.setItem("token",payload.token);
    window.localStorage.setItem("username",payload.username);
  },
  
  // 用户登录
  loginHandler({commit, dispatch}, payload:ILoginUserInfo){
    login(payload).then(res =>{
      const {code, message, data} = res;
      if(code == 200){
        // 登录成功
        ElMessage({message, type: 'success'});

        // 保存token和用户信息
        dispatch("saveUserInfo", data);

        // 跳转到首页
        router.push("/index");
      }else{
        // 登录失败
        ElMessage({message, type: 'error'});
      }
    }).catch(err =>{
      ElMessage({message: err, type: 'error'});
    })
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