import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { ElMessage, ElLoading } from 'element-plus'

import ServiceConfig from "./serviceConfig"

import router from "@/router"
import cache from "@/utils/cache"
import store from "@/store"

const baseConfig: AxiosRequestConfig = {
  baseURL: ServiceConfig.devProxyBaseUrl,
  timeout: ServiceConfig.devTimeout,
}

interface CusResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const instance: AxiosInstance = axios.create(baseConfig)

let loadingInstance: any = null;

// 请求拦截器
instance.interceptors.request.use(config => {
  // 开启loading
  loadingInstance = ElLoading.service({ lock: true, text: '拼命加载中...', background: 'rgba(0, 0, 0, 0.7)', });
  const token = store.getters["auth/token"] || cache.getSessionString("token");
  const username = store.getters["auth/username"];

  // 添加token信息
  config.headers!["Authorization"] = token || "";
  config.headers!["username"] = username || "";

  // 添加时间戳
  config.url += `?t=${new Date().getTime()}`
  return config;
},
  error => {
    // 关闭loading
    loadingInstance.close();
    ElMessage({ message: "请求失败,请联系网站管理员", type: 'error' });
    console.log(error);
  });



// 响应拦截器
instance.interceptors.response.use(response => {
  // 关闭loading
  loadingInstance.close();

  const { code, message } = response.data

  if (code == 200) {
    return response;
  } else {
    // ElMessage({ message, type: 'error' });
  }

  return response;
},
  error => {
    // 关闭loading
    loadingInstance.close();
    if (error.response && error.response.status == 301) {
      router.push("/login");
      ElMessage({ message: error.response.data.message, type: 'error' });
    } else {
      ElMessage({ message: "请求失败,请联系网站管理员", type: 'error' });
    }
  });

const service = async<T = any>(config: AxiosRequestConfig): Promise<CusResponse<T>> => {
  return new Promise(async (resolve, reject) => {
    const data = await instance.request<CusResponse<T>>(config);
    resolve(data.data);
  });
}

export default service;