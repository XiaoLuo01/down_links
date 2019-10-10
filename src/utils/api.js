import https from '../utils/https';
var BASE_URL = 'http://39.108.159.134/api';

// 获取首页 banner
export function banner(){
  return https({
    url: BASE_URL +　'/Banner/BannerList', //请求的地址
    method:'POST'
  })
}

// 获取首页 喇叭内容 和 大广告图
export function adlist(){
  return https({
    url: BASE_URL +　'/ad/adlist', //请求的地址
    method:'POST'
  })
}

// 底部广告图
export function footerImg(){
  return https({
    url: BASE_URL +　'/ad/bottomadList', //请求的地址
    method:'POST'
  })
}

// 获取 app 列表
export function applist(data){
  return https({
    url: BASE_URL +　'/Applist/Applist', //请求的地址
    method:'POST',
    data
  })
}

// 下载 app
export function downloadapp(data){
  return https({
    url: BASE_URL +　'/Applist/downloadapp', //请求的地址
    method:'POST',
    data
  })
}

// 提交留言内容
export function addmessage(data){
  return https({
    url: BASE_URL +　'/Report/addmessage', //请求的地址
    method:'POST',
    data
  })
}

// 举报接口
export function report(data){
  return https({
    url: BASE_URL +　'/Report/report', //请求的地址
    method:'POST',
    data
  })
}