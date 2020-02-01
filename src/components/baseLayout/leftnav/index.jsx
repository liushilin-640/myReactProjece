import React from 'react';
import {  Menu, Icon } from 'antd';
import {withRouter,Link} from 'react-router-dom';
import { FormattedMessage} from 'react-intl';
import menus from '../../../config/menu.js';
const { SubMenu,Item } = Menu;
@withRouter
class Leftnav extends React.Component{
  createMenu = menu=>{
   return menu.map(item=>{
      if(item.children){
        return (
        <SubMenu
          key={item.path}
          title={
            <span>
              <Icon type={item.icon} />
              <FormattedMessage id={item.title} />>
            </span>
          }
        >
         {item.children.map(citem=>{
           return this.createMenuItem(citem)
         })}
        </SubMenu>
        );
      }else{
        return this.createMenuItem(item)
      }
    })
  }
  createMenuItem = menu=>{
    return (
    <Item key={menu.path}>
      <Link to={menu.path}>
        <Icon type={menu.icon} />
        <FormattedMessage id={menu.title}/>
      </Link>
    </Item>
    )
  }
  openMenu = (pathname,menus)=>{
    let menu=menus.find(item=>{
      if(item.children){
        return item.children.find(citem=>{
          return citem.path==pathname
        })
      }
    })
    if(menu){
      return menu.path
    }
  }
  render(){
    const {location} = this.props;
    let path = this.openMenu(location.pathname,menus)
    return (
      <Menu 
      theme="dark" 
      defaultSelectedKeys={[location.pathname]} 
      defaultOpenKeys={[path]}
      mode="inline">
        {this.createMenu(menus)}
      </Menu>
    )
  }
}
export default Leftnav;