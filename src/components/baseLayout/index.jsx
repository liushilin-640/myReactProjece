import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React from 'react';
import { FormattedMessage} from 'react-intl';
import logo from '../../assets/logo.png';
import './index.less';
import Leftnav from './leftnav';
import Headmain from './header'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Baselayout extends React.Component {
  state = {
    collapsed: false,
    isShow:true
  };

  onCollapse = collapsed => {
    const {isShow} = this.state;
    this.setState({ collapsed,isShow:!isShow});
  };

  render() {
    const {children}=this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" >
            <img src={logo} />
            <h3 style={{display:this.state.isShow ? 'block':'none'}}>
              <FormattedMessage id='title'/>
            </h3>
          </div>
          <Leftnav/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Headmain />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0 10px 0' }} >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}