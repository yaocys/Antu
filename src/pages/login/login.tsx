import {Image, Navigator, View} from "@tarojs/components";
import React, {useEffect, useState} from "react";
import {AtButton, AtDivider, AtForm, AtInput} from "taro-ui";
import Taro from "@tarojs/taro";

interface Props{

}

const Login: React.FC<Props>=()=>{

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [captcha,setCaptcha] = useState('');
  const [code,setCode] = useState('');

  const handleSubmit = ()=>{
    let cookie = Taro.getStorageSync('captchaOwner');
    Taro.request({
      url: 'https://yaos.cc/community/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
        captcha: code,
        rememberMe: true
      },
      header:{
        "Content-Type": 'application/x-www-form-urlencoded',
        'Cookie': cookie
      },
      credentials: 'include'
    }).then(
      (response)=>{
        if(response.data.code===400){
          Taro.showToast({
            title: response.data.msg
          })
        }else if(response.data.code===200){
          Taro.setStorageSync('ticket',response.data.data.ticket)
          Taro.setStorageSync('username',response.data.data.username)
          Taro.setStorageSync('userId',response.data.data.userId)
          Taro.setStorageSync('headerUrl',response.data.data.headerUrl)

          Taro.switchTab({
            url:'/pages/user/user'
          })
        }
      }
    )
  }

  const getCaptcha = async () => {
    try {
      const response = await Taro.request({
        url: 'https://yaos.cc/community/captcha',
        responseType: 'arraybuffer',
        header: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        success:(res)=>{
          let captchaOwner = res.header['Set-Cookie'].replace(/,/g, ';')
          Taro.setStorageSync('captchaOwner', captchaOwner)
        }
      });
      const base64 = Taro.arrayBufferToBase64(response.data);
      setCaptcha(`data:image/png;base64,${base64}`)
    } catch (error) {
      Taro.showToast({
        title: '验证码加载失败'
      })
    }
  }

  useEffect(()=>{
    getCaptcha()
  },[])

  const handleReset = ()=>{
    setUsername('');
    setPassword('');
    setCode('');
  }

  const saveFormData = (type: string) => {
    return (value:string) => {
      switch (type) {
        case "username":
          setUsername(value);
          return value;
        case "password":
          setPassword(value);
          return value;
        case "code":
          setCode(value);
          return value;
      }
    }
  }

  const handleWxLogin =  ()=>{
    Taro.getUserProfile({
      desc:'完善用户信息',
      success:async(result)=>{
        const nickName = result.userInfo.nickName;
        const avatarUrl = result.userInfo.avatarUrl;
        await Taro.login({
          success: (res)=>{
            if(res.code){
              Taro.request({
                url: 'https://yaos.cc/community/wechatLogin',
                method: 'POST',
                data: {
                  code: res.code,
                  nickname: nickName,
                  headerUrl: avatarUrl
                },
                success:(response)=>{
                  if(response.data.code===400){
                    Taro.showToast({
                      title: response.data.msg
                    })
                  }else if(response.data.code===200){
                    Taro.setStorageSync('ticket',response.data.data.ticket)
                    Taro.setStorageSync('username',nickName)
                    Taro.setStorageSync('headerUrl',avatarUrl)

                    Taro.switchTab({
                      url:'/pages/user/user'
                    })
                  }
                },fail:()=>{
                  Taro.showToast({
                    title: '请求登录失败'
                  })
                }
              })
            }
          },fail:()=>{
            Taro.showToast({
              title: '获取code失败'
            })
          }
        })
      },
      fail:()=>{
        Taro.showToast({
          title:'获取用户信息失败'
        })
      }
    })
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
            name='captcha'
            title='验证码'
            type='text'
            maxLength={4}
            placeholder='验证码'
            value={code}
            onChange={saveFormData('code')}
          >
            <Image src={captcha} onClick={getCaptcha} />
            {
              // TODO 设置一个60s定时器以及对应的UI效果，提示用户刷新验证码
            }
          </AtInput>
          <View  style={{margin:'30px 15px 8px 15px'}}>
            <AtButton type='primary' circle formType='submit'>登录</AtButton>
          </View>
          <View  style={{margin:'30px 15px 8px 15px'}}>
            <AtButton type='secondary' circle>去注册</AtButton>
          </View>
          <AtDivider content='一键登录' height='30px' fontSize='26' />
          <View  style={{margin:'8px 15px'}}>
            <AtButton type='primary' circle onClick={handleWxLogin}>微信登录</AtButton>
          </View>
        </AtForm>
          <View style={{fontSize:'x-small',color:'#b2bec3',textAlign:'center',marginTop:'40px'}}>
            登录即代表您已阅读并同意 用户协议 和 隐私条款
          </View>
      </View>
    </View>
  )
}

export default Login;
