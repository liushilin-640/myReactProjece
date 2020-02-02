import axiosInstance from './interceptors'
export const logined = (username,password)=>{
  return axiosInstance({
    url:'/login',
    method:'POST',
    data:{
      username,
      password
    }
  })
}
export const qinqiuList = ()=>{
  return axiosInstance({
    url:'/category/get',
    method:'GET'
  })
}