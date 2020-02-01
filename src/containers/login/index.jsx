import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {withRouter} from 'react-router-dom'
import Image from '../../assets/logo.png';
import './index.less';
import {saveUserAsync} from '../../redux/actions';
import checkLogin from '../with-check-login'
@withRouter
@Form.create()
@checkLogin
@connect(null,{saveUserAsync})
class Login extends React.Component{
  checked=(rule, value, callback) => {
    const reg = /^\w+$/;
    const inputName=rule.field =='username'? '用户名':'密码';
   if(!value){
    callback(`${inputName}不能为空`)
   }else if(value.length<4){
    callback(`${inputName}长度不能小于4位`)
   }else if(value.length>15){
    callback(`${inputName}不能超过15位`)
   }else if(!reg.test(value)){
     callback(`${inputName}只能有字母、数字、下划线组成`)
   }
   callback()
  }
  logined=(event)=>{
    event.preventDefault();
    this.props.form.validateFields((errors,values)=>{
      if(!errors){
        const {username,password}=values;
        /* axios.post('/api/login', {
         username,password
        })
        .then((response)=> {
          console.log(response)
          if(response.data.status===0){
            this.props.history.replace('/home')
          }else{
            message.error(response.data.msg);
            this.props.form.resetFields(['username','password'])
          }
        })
        .catch((error)=> {
          message.error('网络问题，请检查你的网络')
          this.props.form.resetFields(['username','password'])
        }); */
        this.props.saveUserAsync(username,password).then(()=>{
          /* console.log(response) */
          this.props.history.replace('/');
        }).catch(msg=>{
          console.log(msg)
          message.error(msg);
          this.props.form.resetFields(['username','password'])
        })


      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-head">
          <img src={Image} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-main">
          <h3>用户登录</h3>
          <Form className="forms" onSubmit={this.logined} >
          <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                validator: this.checked
              }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
            rules: [
              {
                validator: this.checked
              }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
            
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"  className="btn">
            登 录
          </Button>
        </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Login