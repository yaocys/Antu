import {useEffect, useState} from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import {AtAvatar, AtButton, AtGrid, AtList, AtListItem} from "taro-ui";


import './index.scss'

const User = ()=>{

  const [login,setLogin] = useState(!!Taro.getStorageSync('ticket'));

  useDidShow(()=>{
    setLogin(!!Taro.getStorageSync('ticket'))
  })

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
            style={{backgroundColor:'white',paddingBottom:'30px'}}
          >
            <View className='at-col-3'>
              <AtAvatar circle image={Taro.getStorageSync('headerUrl')} size='large' />
            </View>
            <View className='at-col-5' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{fontWeight: 'bolder', fontSize: 'medium', marginBottom: '10px'}}>{Taro.getStorageSync('username')}</View>
              <View style={{fontSize: '10px', color: '#b2bec3'}}>上海财经大学 计算机类</View>
            </View>
            <View className='at-col-3 at-col__align--center'>
              <AtButton type='primary' size='small' circle style={{fontSize: 'x-small'}}>个人中心</AtButton>
            </View>
          </View>
          <View className='at-row at-row__justify--center' style={{paddingBottom:'25px',backgroundColor:'white',marginBottom:'5px'}}>
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
        <AtListItem title='&nbsp;兑换商城' onClick={handleClick} arrow='right'
          iconInfo={{ size: 20, color: '#e17055', value: 'shopping-bag', }}
          extraText='纪念币上新'
        />
        <AtListItem title='&nbsp;金币任务' arrow='right'
          iconInfo={{ size: 20, color: '#fdcb6e', value: 'list', }}
        />
        <AtListItem title='&nbsp;我的关注' arrow='right'
          iconInfo={{ size: 20, color: '#00cec9', value: 'tags', }}
        />
        <AtListItem title='&nbsp;深色模式'
          iconInfo={{ size: 20, color: '#2d3436', value: 'loading', }}
          isSwitch
          onSwitchChange={handleChange}
        />
        <AtListItem title='&nbsp;设置' arrow='right'
          iconInfo={{ size: 20, color: '#0984e3', value: 'settings', }}
          onClick={()=>Taro.navigateTo({url:'/pages/setting/setting'})}
        />
        <AtListItem title='&nbsp;帮助与反馈' extraText='详细信息' arrow='right'
          iconInfo={{ size: 20, color: '#636e72', value: 'help', }}
        />
        <AtListItem arrow='right'
          title='&nbsp;关于' extraText='v1.0.3&nbsp;'
          iconInfo={{ size: 20, color: '#b2bec3', value: 'alert-circle', }}
        />
      </AtList>
    </View>
  )
}

export default User;
