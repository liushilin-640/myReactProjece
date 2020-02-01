import React from 'react';
import{Route,Switch,Redirect}from'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {ConfigProvider} from 'antd';
import Login from './containers/login';
import Home from './components/home';
import BaseLayout from './components/baseLayout';
import {zh,en} from './locales';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

@connect((state)=>({language:state.language}),null)
class App extends React.Component{
  render(){
    let language=this.props.language;
    let messages = language=='en'? en:zh;
    return (
      <ConfigProvider locale={language=='en'? enUS:zhCN}>
        <IntlProvider locale={language} messages={messages}>
          <Switch>
            <Route path='/login' component={Login} />
            <BaseLayout>
              <Route path='/' component={Home} />
            </BaseLayout>
          </Switch> 
        </IntlProvider>
      </ConfigProvider>
      
    )
   
  }
}

export default App;
