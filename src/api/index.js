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