import axios from "axios";
import { ElMessage } from "element-plus";

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
  (response) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (response.status !== 200) {
      ElMessage.error(response.message);
    }

    return Promise.reject(error);
  },
);
export { instance };
