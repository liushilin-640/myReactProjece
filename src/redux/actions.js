import {logined} from '../api';
import {setItem} from '../utils';
import {SAVE_USER,REMOVE_USER,CHANGE_LANGUAGE} from './action-types'
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