import axios from "axios";
import Taro from "@tarojs/taro";

const instance = axios.create({
  baseURL: 'https://yaos.cc/community',
  timeout: 10000,
  withCredentials: true
})

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    // 在响应返回之前做一些处理，如解密等
    switch (response.data.code) {
      case 200:
        return response;
      default:
        return response;
    }

  },
  (error) => {
    Taro.showToast({
      title: '请求失败'
    })
    console.log(error);
  }
);

export default instance;
