import axios, { isAxiosError } from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300; // 200-299 都认为是成功
};
const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  // baseURL: "https://backend-uy6g.onrender.com",
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== 0) {
      ElMessage.error(response.data.message);
      return Promise.reject(response);
    }
    return response.data.data;
  },
  (error) => {
    // 错误处理
    if (isAxiosError(error)) {
      const { status } = error.response as any;
      const flag = isSameError(error);
      if (flag) {
        return Promise.reject(error);
      }
      // 处理token失效的情况（通常是401错误）
      if ([401].includes(status)) {
        localStorage.removeItem("token");
        router.push("/login");
      }
      ElMessage.error(`网络错误：${error.message || "未知错误"}`);
    } else {
      // 非Axios错误，例如代码抛出的错误
      ElMessage.error(`应用错误：${error.message || "未知错误"}`);
    }

    return Promise.reject(error); //抛出，阻断后续
  },
);
const isSameError = (() => {
  let error = null;
  let timeSeed = null;
  return (e) => {
    clearTimeout(timeSeed);
    timeSeed = null;
    timeSeed = setTimeout(() => {
      error = null; // 重置错误状态
    }, 1000);
    console.log(error && error.message === e.message);
    if (error && error.message === e.message) {
      return true;
    } else {
      error = e;
      return false;
    }
  };
})();
export { instance };
