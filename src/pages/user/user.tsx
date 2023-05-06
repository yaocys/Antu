import {useState} from 'react'
import { View, Text } from '@tarojs/components'
import {AtAvatar, AtButton, AtGrid, AtList, AtListItem} from "taro-ui";
import Taro from "@tarojs/taro";

import './index.scss'

const User = ()=>{

  const [login,setLogin] = useState(false);

  const handleClick = ()=>{

  }

  const handleChange = ()=>{

  }

  const handleLogin=()=>{
    Taro.navigateTo({
      url: '/pages/login/login',
    })
  }

  const loginOrNot = ()=>{
    if(login){
      return (
        <>
          <View className='at-row at-row__justify--center'
                style={{backgroundColor:'white',paddingBottom:'20px'}}
          >
            <View className='at-col-3'>
              <AtAvatar circle image='https://jdc.jd.com/img/200' size='large' />
            </View>
            <View className='at-col-5' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{fontWeight: 'bolder', fontSize: '13px', marginBottom: '3px'}}>岸途21421435324号</View>
              <View style={{fontSize: '10px', color: '#b2bec3'}}>上海财经大学 计算机类</View>
            </View>
            <View className='at-col-3 at-col__align--center'>
              <AtButton type='primary' size='small' circle style={{fontSize: 'x-small'}}>个人中心</AtButton>
            </View>
          </View>
          <View className='at-row at-row__justify--center' style={{paddingBottom:'20px',backgroundColor:'white',marginBottom:'5px'}}>
            <View className='at-col-3' style={{textAlign:'center'}}>
              <View className='at-icon at-icon-message' style={{fontSize:'x-large',marginBottom:'5px'}} />
              <View style={{fontSize:'small'}}>评论</View>
            </View>
            <View className='at-col-3' style={{textAlign:'center'}}>
              <View className='at-icon at-icon-edit' style={{fontSize:'x-large',marginBottom:'5px'}} />
              <View style={{fontSize:'small'}}>帖子</View>
            </View>
            <View className='at-col-3' style={{textAlign:'center'}}>
              <View className='at-icon at-icon-star' style={{fontSize:'x-large',marginBottom:'5px'}} />
              <View style={{fontSize:'small'}}>收藏</View>
            </View>
            <View className='at-col-3' style={{textAlign:'center'}}>
              <View className='at-icon at-icon-clock' style={{fontSize:'x-large',marginBottom:'5px'}} />
              <View style={{fontSize:'small'}}>足迹</View>
            </View>
          </View>
        </>
      )
    }else return (
      <View onClick={handleLogin} style={{backgroundColor:'white',marginBottom:'5px',fontSize:'x-large',padding:'20px'}}>
        点击登录
      </View>
    )
  }


  return (
    <View className='user' style={{backgroundColor:'#dfe6e9'}}>

      {
        loginOrNot()
      }



      <AtList>
        <AtListItem title='&nbsp;金币商城' onClick={handleClick}
                    iconInfo={{ size: 20, color: '#78A4FA', value: 'shopping-bag', }}
        />
        <AtListItem title='&nbsp;金币任务' arrow='right'
                    iconInfo={{ size: 20, color: '#78A4FA', value: 'list', }}
        />
        <AtListItem title='&nbsp;我的资产' arrow='right'
                    iconInfo={{ size: 20, color: '#78A4FA', value: 'money', }}
        />
        <AtListItem title='&nbsp;设置' extraText='详细信息'
                    iconInfo={{ size: 20, color: '#78A4FA', value: 'settings', }}
        />
        <AtListItem title='&nbsp;帮助与反馈' disabled extraText='详细信息'
                    iconInfo={{ size: 20, color: '#78A4FA', value: 'help', }}
        />
        <AtListItem
          title='&nbsp;关于'
          isSwitch
          onSwitchChange={handleChange}
          iconInfo={{ size: 20, color: '#78A4FA', value: 'alert-circle', }}
        />
      </AtList>
    </View>
  )
}

export default User;
