import React from 'react';
import checkLogin from '../../containers/with-check-login'
@checkLogin
class Home extends React.Component{
  render(){
    return (
      <h3>我是home组件</h3>
    )
  }
}
export default Home;