import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const baseConfig: AxiosRequestConfig = {
  // target path: https://www.wanandroid.com/
  baseURL: "/api/ums",
  timeout: 5000,
}

interface CusResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const instance: AxiosInstance = axios.create(baseConfig)

instance.interceptors.request.use(config => {
  return config;
},
  error => {
    console.log(error);
  }
);


instance.interceptors.response.use(response => {
  return response;
},
  error => {
    console.log(error);
  }
)


const service = async<T = any>(config: AxiosRequestConfig): Promise<CusResponse<T>> => {
  return new Promise(async (resolve, reject) => {
    const data = await instance.request<CusResponse<T>>(config);
    resolve(data.data);
  });
}

export default service;