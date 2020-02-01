import React from 'react';
import { Button,Icon , Modal} from 'antd';
import screenfull from 'screenfull';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {injectIntl,FormattedMessage} from 'react-intl';
import dayjs from 'dayjs';
import './index.less';
import {removeItem} from '../../../utils';
import {removeUser,changeLanguage} from '../../../redux/actions.js';
import menus from '../../../config/menu';
const { confirm } = Modal;

@injectIntl
@connect((state)=>({user:state,language:state.language}),{removeUser,changeLanguage})
@withRouter
class Headmain extends React.Component{
  state={
    isFull:false,
    date:Date.now()
  }
  isFullMd=()=>{
    this.setState({
      isFull:!this.state.isFull
    })
  }
  componentDidMount(){
    screenfull.on('change', this.isFullMd);
    this.timeId=setInterval(() => {
      this.setState({
        date:Date.now()
      })
    }, 1000);
  }
  componentWillUnmount(){
    screenfull.off('change', this.isFullMd);
    clearInterval(this.timeId)
  }
  quanping=()=>{
    screenfull.toggle();
  }
  goout=()=>{
    const {intl} =this.props;
    confirm({
      title: intl.formatMessage({id:'logout'}),
      /* okText: '确定',
      cancelText: '取消', */
      onOk:()=>{
        removeItem('user');
        this.props.removeUser();
        this.props.history.replace('/login')
      }
      /* onCancel:()=>{
      }, */
    });
    
  }
  changeLg=()=>{
    let lang = this.props.language;
    lang=lang=='en'?'zh-CN':'en';
    this.props.changeLanguage(lang)
  }
  findTitle=(menus,pathname)=>{
    for(let i=0;i<menus.length;i++){
      if(menus[i].children){
        for(let j=0;j<menus[i].children.length;j++){
          if(menus[i].children[j].path==pathname){
            return menus[i].children[j].title
          }
        }
      }else{
        if(pathname==menus[i].path){
          return menus[i].title
        }
      }
    }
  }
  render(){
    const {isFull,date}=this.state;
    const {pathname}=this.props.location;
    let title = this.findTitle(menus,pathname);
    console.log(title)
    return (

      <div className='mhead'>
        <div className='first'>
          <Button size="small" className='btn' onClick={this.quanping}><Icon type={isFull? "fullscreen-exit" : "fullscreen"} /></Button>
    <Button size="small" className='btn' onClick={this.changeLg}>{this.props.language=='en'?'中文':"English"}</Button>
          <span className='btn'>hello,{this.props.user.user&&this.props.user.user.user.username}</span>
          <Button type="link" size="small" className='btn' onClick={this.goout}>退 出</Button>
        </div>
        <div className='two'>
          <div className='two1'><FormattedMessage id={title}/></div>
          <div className='two2'>{ dayjs(date).format('YYYY/MM/DD HH:mm:ss') }</div>
        </div>

      </div>
      
    )
  }
}
export default Headmain;