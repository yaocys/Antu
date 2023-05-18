import {Image, View} from "@tarojs/components";
import {AtButton, AtForm, AtInput} from "taro-ui";
import React, {useState} from "react";
import Taro from "@tarojs/taro";

interface Props{

}

const Register:React.FC<Props> = ()=>{

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = ()=>{
    Taro.showToast({
      title: '激活邮件已发送'
    })
  }

  const handleReset = ()=>{

  }

  const saveFormData=(type:string)=>{
    return (value:string) => {
      switch (type) {
        case "username":
          setUsername(value);
          return value;
        case "password":
          setPassword(value);
          return value;
        case "passwordConfirm":
          setPasswordConfirm(value)
          return value;
        case "email":
          setEmail(value)
          return value;
      }
    }
  }

  return (
    <View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,height:'20vh'}}>
        <Image src={require('../../resource/nav.png')} mode='aspectFit' style={{width:'140px'}} />
      </View>
      <View  style={{padding: '0 30px'}}>
        <AtForm onSubmit={handleSubmit} onReset={handleReset}>
          <AtInput
            name='username'
            title='用户名'
            type='text'
            placeholder='请输入用户名'
            value={username}
            onChange={saveFormData('username')}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={saveFormData('password')}
          />
          <AtInput
            name='passwordConfirm'
            title='确认密码'
            type='password'
            placeholder='请确认密码'
            value={passwordConfirm}
            onChange={saveFormData('passwordConfirm')}
          />
          <AtInput
            name='email'
            title='邮箱'
            type='text'
            placeholder='请输入邮箱'
            value={email}
            onChange={saveFormData('email')}
          />
          <View  style={{margin:'30px 15px 8px 15px'}}>
            <AtButton type='primary' circle formType='submit'>注册</AtButton>
          </View>
          <View  style={{margin:'30px 15px 8px 15px'}}>
            <AtButton type='secondary' circle
              onClick={()=>Taro.navigateTo({url:'/pages/login/login'})}
            >去登录</AtButton>
          </View>

        </AtForm>
        <View style={{fontSize:'x-small',color:'#b2bec3',textAlign:'center',marginTop:'40px'}}>
          注册 即代表您已阅读并同意 用户协议 和 隐私条款
        </View>
      </View>
    </View>
  )
}

export default Register
