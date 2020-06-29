import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://xxx.xxx.xx.xx:xxxx', // 接口已更改，请联系自行联系老师购买，微信: coderwhy003

    timeout: 5000,
  });

  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    return Promise.reject(err);
  });

  instance.interceptors.response.use(response => {
    return response.data;
  }, err => {
    return Promise.reject(err);
  });

  return instance(config);
}