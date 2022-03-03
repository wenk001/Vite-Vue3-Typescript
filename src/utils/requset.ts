import axios from 'axios';

import { getToken, removeToken, setToken } from './../utils/cookie'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? '' : '/api', // api 的 base_url
  timeout: 10000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // 这里可以添加头部公共请求信息
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    // console.log(error); // for debug
    // Promise.reject(error);
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  // (response) => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    const res = response.data;
    if (res.code == '-2') { // 未登录
      (window as any).$dialog.warning({
        title: '温馨提示',
        content: '请重新登录',
        positiveText: '确定',
        onPositiveClick: () => {
          removeToken()
          location.hash = '/login'
          location.reload()
        }
      })
    } else if (res.code != 200) {
      (window as any).$message.error(res.message)
    }
    return response;
  },
  (error) => {
    // console.log('err' + error); // for debug
    return Promise.reject(error);
  },
);

export default service;
