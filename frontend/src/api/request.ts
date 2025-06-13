import axios from "axios";

axios.defaults.validateStatus = (status) => {
  return status === 200; //只认200
};
const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  // baseURL: "https://backend-uy6g.onrender.com",
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  console.log("请求过来了", config);
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);
export { instance };
