import axios from 'axios';
import store from '../redux/store'
const axiosInstance = axios.create({
  baseURL:'/api',
  timeout:20000,
  headers:{

  }
});
//请求拦截器
axiosInstance.interceptors.request.use(
  (config)=>{
    console.log(store.getState())
    let token =store.getState().token;
    if(token){
      config.headers.authorization=`Bearer${token}`;
    }
    /* if(config.method=='post'){
      config.data=Object.keys(config.data).reduce((prev,item)=>{
        prev+=`&{item}=${config.data[item]}`
        return prev
      },'').slice(1);
      config.headers['content-type']='application/x-www-form-urlencoded'
    } */
    return config;
  }
)
//响应拦截器
axiosInstance.interceptors.response.use(
  (response)=>{
    if(response.data.status===0){
      return response.data.data
    }else{
      console.log(response)
      return Promise.reject(response.data.msg)
    }
  },
  (err)=>{
    console.dir(err)
    let errInfo='';
    const errCode = {
      401: '没有权限访问当前接口',
      403: '禁止访问当前接口',
      404: '当前资源未找到',
      500: '服务器发生未知错误，请联系管理员'
    };
    if(err.response){
      errInfo=errCode[err.response.status];
    }else{
      if(err.message.indexOf('Network Error')!==-1){
        console.log(11111)
        errInfo='网络问题，请检查你的网络'
      }else if(err.message.indexOf('timeout')!==-1){
        errInfo='连接超时，请检查你的网络'
      }
    }
    return Promise.reject(errInfo || '未知错误，请联系程序员')
  }
);
export default axiosInstance;