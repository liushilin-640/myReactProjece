import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
export default function checkLogin(WrappedComponent){
  @connect((state)=>({use:state}),null)
  class Checklogin extends React.Component{
    static displayName = `checkLogin(${WrappedComponent.displayName ||  // 给组件命名
      WrappedComponent.name ||
      'Component'})`;
    render(){
      const {location,use} =this.props;
      if(use.user.token){
        if(location.pathname=='/login'){
         return <Redirect to='/'/>
        }
      }else{
        if(location.pathname!=='/login')
        return <Redirect to='/login' />
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  return Checklogin
}