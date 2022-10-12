import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import type { ILoginUserInfo } from "@/views/login/loginTypes"
import type { RootState } from "../../types"
import type { IAuthState } from "./types";

import { login, logout } from "@/service/auth.service";
import router from "@/router/index"
import { ElMessage } from "element-plus";
import cache from "@/utils/cache";

const namespaced: boolean = true;

const state: IAuthState = {
  user: {
    username: "ilovesshan",
    token: "",
    userDetail: "",
  }
}

const getters: GetterTree<IAuthState, RootState> = {
  isLogin(state, getters) {
    return state.user.token !== "" && state.user.username !== "";
  },

  userInfo(state, getters) {
    return getters.isLogin ? state.user.userDetail : "";
  },

  username(state, getters) {
    return getters.isLogin ? state.user.username : "";
  },

  token(state, getters) {
    return getters.isLogin ? state.user.token : "";
  }
}

const mutations: MutationTree<IAuthState> = {
  saveUserInfo(state: IAuthState, payload: any) {
    const { username, token } = payload;
    state.user.userDetail = payload;
    state.user.username = username;
    state.user.token = token;
  },

  cleanUserInfo(state: IAuthState, payload: any) {
    state.user.userDetail = "";
    state.user.username = "";;
    state.user.token = "";;
  }

}

const actions: ActionTree<IAuthState, RootState> = {
  // 保存用户信息
  saveUserInfo({ commit }, payload: any) {
    commit("saveUserInfo", payload);
    // 将用户信息保存在sessionStorage中
    cache.saveSessionString("token", payload.token);
    cache.saveSessionObject("userInfo", payload);
  },

  cleanUserInfo({ commit }, payload: any) {
    commit("cleanUserInfo", payload);
    cache.remove("token");
    cache.remove("userInfo");
  },

  // 用户登录
  loginHandler({ commit, dispatch }, payload: ILoginUserInfo) {
    login(payload).then(res => {
      const { code, message, data } = res;
      if (code == 200) {
        // 登录成功
        ElMessage({ message, type: 'success' });

        // 保存token和用户信息
        dispatch("saveUserInfo", data);

        // 跳转到首页
        router.push("/");
      } else {
        // 登录失败
        ElMessage({ message, type: 'error' });
      }
    }).catch(err => {
      ElMessage({ message: err, type: 'error' });
    })
  },

  // 退出登录
  logoutHandler({ commit, dispatch }, payload: ILoginUserInfo) {
    logout().then(res => {
      const { code, message } = res;
      if (code == 200) {
        ElMessage({ message, type: 'success' });
        dispatch("cleanUserInfo");
        router.push("/login");
      } else {
        ElMessage({ message, type: 'error' });
      }
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