import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
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