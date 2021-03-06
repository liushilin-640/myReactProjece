import { combineReducers } from 'redux';
import {SAVE_USER,REMOVE_USER,CHANGE_LANGUAGE,CATEGORY_LIST} from './action-types';
import {getItem} from '../utils'
const initUser = getItem('user') || {}
 function user(prevState=initUser,action){
  switch(action.type){
    case SAVE_USER:
      return action.data
    case REMOVE_USER:
      return {}
    default:
      return prevState
  }
}
const initLange = navigator.language;
function language(prevState=initLange,action){
  switch(action.type){
    case CHANGE_LANGUAGE:
      return action.data
    default:
      return prevState
  }
}
function category(prevState=[],action){
  switch(action.type){
    case CATEGORY_LIST:
      return action.data
    default:
      return prevState
  }
}
export default combineReducers(
  {
    user,
    language,
    category
    
  }
)
/* export default user */