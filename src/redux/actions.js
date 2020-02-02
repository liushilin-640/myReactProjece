import {logined} from '../api';
import {setItem} from '../utils';
import {SAVE_USER,REMOVE_USER,CHANGE_LANGUAGE,CATEGORY_LIST} from './action-types';
import {qinqiuList} from '../api'
const saveUser=(user)=>{
  return {
    type:SAVE_USER,
    data:user
  }
}
export const saveUserAsync=(username,password)=>{
  return (dispatch)=>{
    return logined(username,password).then(response=>{
      setItem('user',response);
      dispatch(saveUser(response))
    })
  }
}
export const removeUser=()=>{
  return {
    type:REMOVE_USER
  }
}
export const changeLanguage=(lang)=>{
  return {
    type:CHANGE_LANGUAGE,
    data:lang
  }
}
const category=(data)=>{
  return {
    type:CATEGORY_LIST,
    data
  }
}
export const categoryList=()=>{
  return (dispatch)=>{
    qinqiuList().then((response)=>{
      console.log(response)
      dispatch(category(response))
    })
  }
}