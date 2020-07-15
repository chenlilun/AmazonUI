import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
// let apiUrl = process.env.NODE_ENV === 'production'?"http://192.168.0.108:8084":sysConfig.xcApiUrlPre;
let apiUrl = process.env.NODE_ENV === 'production'?"http://localhost:8084":sysConfig.xcApiUrlPre;
// let apiUrl = process.env.NODE_ENV === 'production'?"http://47.114.169.54:8084":sysConfig.xcApiUrlPre;


//定义方法 请求服务查询接口

export  const  page_list  = (page,size,params)=>{
 let quaryString =  querystring.stringify(params) ;
  return   http.requestQuickGet(apiUrl+'/abc/cms/page/list/'+page+'/'+size+'?'+quaryString) ;
}
//定义方法 请求文件查询接口

export  const  file_list  = (page,size,params)=>{
  let quaryString =  querystring.stringify(params) ;
  return   http.requestQuickGet(apiUrl+'/abc/cms/file/list/'+page+'/'+size+'?'+quaryString) ;
}

export  const  exception_list =  params =>{
  // return http.requestPost(apiUrl+'/abc/exception/getException', params)
  return http.requestPost(apiUrl+'/abc/exception/getException', params)
}
export  const  board_list =  (a ,b) =>{
  // return http.requestPost(apiUrl+'/abc/exception/getException', params)
  return http.requestGet(apiUrl+'/exception/getBorad/'+a+'/'+b)
}
//定义新增表单方法
export  const  pageAdd  = params =>{
  return http.requestPost(apiUrl+'/abc/cms/page/add',params)
}

export  const  page_get = pageId =>{
  return http.requestGet(apiUrl+'/abc/cms/page/get/'+pageId)
}

export  const    page_edit = (pageId ,params)  =>{
  return http.requestPut(apiUrl+'/abc/cms/page/put/'+pageId, params)
}

export  const  item_del = pageId =>{
  return http.requestDelete(apiUrl+'/abc/cms/page/del/'+pageId)
}

export  const  item_del_file = fileId =>{
  return http.requestDelete(apiUrl+'/abc/cms/file/delFile/'+fileId)
}
