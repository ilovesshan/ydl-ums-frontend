import type {
  Module,
  MutationTree,
  ActionTree,
  GetterTree
} from "vuex"

import type { ILoginUserInfo } from "@/views/login/loginTypes"
import type { RootState } from "../../types"
import type { IAuthState } from "./types";

import { login, logout, permission } from "@/service/auth.service";
import router from "@/router/index"
import { ElMessage } from "element-plus";
import cache from "@/utils/cache";

const namespaced: boolean = true;

const state: IAuthState = {
  user: {
    username: "ilovesshan",
    token: "",
    userDetail: "",
  },
  permission: {
    permissions: [],
    roles: [],
    rolesAndPermissions: "",
  },
}

const getters: GetterTree<IAuthState, RootState> = {
  isLogin(state, getters): boolean {
    return state.user.token !== "" && state.user.username !== "";
  },

  userDetail(state, getters): string {
    return getters.isLogin ? state.user.userDetail : "";
  },

  userId(state, getters): string {
    return getters.isLogin ? state.user.userDetail.userId : "";
  },

  username(state, getters): String {
    return getters.isLogin ? state.user.username : "";
  },

  token(state, getters): String {
    return getters.isLogin ? state.user.token : "";
  },

  permissions(state, getters): string[] {
    return getters.isLogin ? state.permission.permissions : [];
  },

  roles(state, getters): string[] {
    return getters.isLogin ? state.permission.roles : [];
  }
}

const mutations: MutationTree<IAuthState> = {
  saveUserInfo(state: IAuthState, payload: any) {
    const { userInfo, token } = payload;
    state.user.userDetail = userInfo;
    state.user.username = userInfo.username;
    state.user.token = token;
  },

  cleanUserInfo(state: IAuthState, payload: any) {
    state.user.userDetail = "";
    state.user.username = "";;
    state.user.token = "";;
  },

  saveUserPermissionInfo(state: IAuthState, payload: any) {
    const { roles, permissions, rolesAndPermissions } = payload;
    state.permission.roles = roles;
    state.permission.permissions = permissions;
    state.permission.rolesAndPermissions = rolesAndPermissions;
  },
}

const actions: ActionTree<IAuthState, RootState> = {
  // 保存用户信息
  saveUserInfo({ commit }, payload: any) {
    commit("saveUserInfo", payload);
    // 将用户信息保存在sessionStorage中
    cache.saveSessionString("token", payload.token);
    cache.saveSessionObject("userInfo", payload.userInfo);
  },

  // 清除用户信息
  cleanUserInfo({ commit }, payload: any) {
    commit("cleanUserInfo", payload);
    cache.remove("token");
    cache.remove("userInfo");
  },

  // 获取用户权限信息
  saveUserPermissionInfo({ commit }, userId: number) {
    return new Promise((resolve, reject) => {
      // 获取当前用户的角色权限信息
      permission(userId).then(res => {
        const { code, message, data } = res;
        if (code == 200) {
          commit("saveUserPermissionInfo", data);
          resolve(0);
        } else {
          ElMessage({ message, type: 'error' });
          reject()
        }
      }).catch(err => {
        console.log(err);
        reject()
      });
    })
  },

  // 用户登录
  loginHandler({ commit, dispatch, state }, payload: ILoginUserInfo) {
    login(payload).then(res => {
      const { code, message, data } = res;
      if (code == 200) {
        // 登录成功
        ElMessage({ message, type: 'success' });

        // 保存token和用户信息
        dispatch("saveUserInfo", { token: data.token, userInfo: data.ydlUser });

        // 获取用户权限信息
        dispatch("saveUserPermissionInfo", state.user.userDetail.userId).then(_ => {
          // 跳转到首页
          router.push("/");
        });

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