import {Image, Navigator, View} from "@tarojs/components";
import React, {useState} from "react";
import {AtButton, AtDivider, AtForm, AtInput} from "taro-ui";

interface Props{

}

const Login: React.FC<Props>=()=>{

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = ()=>{

  }

  const handleReset = ()=>{

  }

  const handleInput = ()=>{

  }

  return (
    <View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,height:'20vh'}}>
        <Image src={require('../../resource/nav.png')} mode='aspectFit' style={{width:'140px'}} />
      </View>
      <View  style={{padding: '0 30px'}}>
        <AtForm>
          <AtInput
            name='value1'
            title='用户名'
            type='text'
            placeholder='请输入用户名'
            value={username}
            onChange={handleInput}
          />
          <AtInput
            name='value2'
            title='密码'
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={handleInput}
          />
        </AtForm>
          <View  style={{margin:'30px 15px 8px 15px'}}>
            <AtButton type='primary' circle formType='submit'>登录</AtButton>
          </View>
          <View  style={{margin:'30px 15px 8px 15px'}}>
            <AtButton type='secondary' circle>去注册</AtButton>
          </View>
          <AtDivider content='一键登录' height='30px' fontSize='26' />
          <View  style={{margin:'8px 15px'}}>
            <AtButton type='primary' circle>微信登录</AtButton>
          </View>
          <View style={{fontSize:'x-small',color:'#b2bec3',textAlign:'center',marginTop:'40px'}}>
            登录即代表您已阅读并同意 用户协议 和 隐私条款
          </View>
      </View>
    </View>
  )
}

export default Login;
