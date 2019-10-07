import axios from 'axios';
const qs = require('qs');
import { Toast } from 'vant';

const service=axios.create({
    // baseURL: process.env.BASE_API,    //请求公共地址，baseURL`将被添加到`url`，所以后边请求只需api的方式即可
    timeout: 5000,    //请求响应时间
})

// 添加一个请求拦截器
service.interceptors.request.use(function (config) {
  // 对请求数据做些事
  if(config.method  === 'post'){  //post传参序列化
    config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做些事
  return response;
}, function (error) {
  let errMsg = "";
   if(err && err.response.status) {
     switch (err.reponse.status) {
       case 403:
         errMsg = '拒绝访问';
         break;
       case 408:
         errMsg = '请求超时';
         break;
       case 500:
         errMsg = '服务器内部错误';
         break;
       case 501:
         errMsg = '服务未实现';
         break;
       case 502:
         errMsg = '网关错误';
         break;
       case 503:
         errMsg = '服务不可用';
         break;
       case 504:
         errMsg = '网关超时';
         break;
       default:
         errMsg = err.response.data.respond.msg;
         break;
     }
   } else {
     errMsg = err;
   }
 
   Toast(errMsg);
   return Promise.reject(errMsg);
});
export default  service;