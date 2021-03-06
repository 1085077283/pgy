import axios from 'axios';
import qs from 'qs';
import router from '../router'
import { getLocal } from './util'

// axios 配置
axios.defaults.timeout = 30000;
/*线上的走api.xrjinrong.com，公司开发走www.zzdd.com(172.18.0.91)*/

const IsProd = process.env.NODE_ENV === 'production'?true:false;
const IsDev = process.env.NODE_ENV === 'development'?true:false;
const IsTest = process.env.NODE_ENV === 'testing'?true:false;
const IsZZ = 0;

// if(IsDev){
//   axios.defaults.baseURL = '';
// }else if(IsTest){
//   axios.defaults.baseURL = 'http://apitest.pgyxwd.com'
// }else if(IsProd){
//   axios.defaults.baseURL = 'http://apitest.pgyxwd.com';
// };

// axios.defaults.baseURL = 'https://wj.egiocu.cn';

//欣荣
// axios.defaults.baseURL = 'http://wj.xuehuistore.cn';
//呗呗钱包
// axios.defaults.baseURL = 'http://wj.ysjbank.cn';
// axios.defaults.baseURL = 'https://xr.pgyxwd.com';
//无界钱包
axios.defaults.baseURL = 'http://apitest.pgyxwd.com';
//axios.defaults.baseURL = 'http://xs.com';
// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = getLocal('token');
    const path = getLocal('path');
    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //判断token是否存在
    //console.log(token)
    if (token) {
        config.headers['token'] = token;
    }else{
      if(path === '/login'){
        router.push({path: '/login'});
      }
    }
    
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);



// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.status == 9) {
      window.localStorage.clear();
      router.push({
        path: '/login'
      });
    }
    return response;
  },
  error => {
    /*if (error.response) {
      router.push({path: '/login'});
    }*/
    return Promise.reject(error.response.data)
  });

export default axios;

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export const fetch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if(response.data.status!=9){
          resolve(response.data);
        }
      })
      .catch(err => {
        // console.log(err)
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data))
    .then(response => {
      if(response.data.status!=9){
      resolve(response.data);
      }
    })
    .catch(err => {
      // console.log(err)
      reject(err)
    })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
