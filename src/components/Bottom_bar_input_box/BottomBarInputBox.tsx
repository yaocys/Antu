/**
 * 这是 固定在页面底部的、带输入框的 底栏组件
 */
import {View} from "@tarojs/components";
import {AtBadge} from "taro-ui";
import {useState} from "react";
import './index.scss'


function BottomBarInputBox(){

  return (
    <View className='bottom_bar'>
      <View style={{margin:'10px 8px 35px 5px'}} className='at-row'>
        <View className='at-col-1 at-icon at-icon-chevron-left'
              style={{fontSize:'30px',textAlign:'left',lineHeight:'34px'}}
        />
        <View className='at-row at-row__justify--center at-col-6'>
          <View className='commentContent at-col at-col-10'>
            说两句…
          </View>
        </View>
        <View  className='at-col-2 at-row__justify--center at-row'>
          <AtBadge value={10} maxValue={99}>
            <View className=' at-icon at-icon-message'
                  style={{fontSize:'25px',textAlign:'center',lineHeight:'34px'}}
            />
          </AtBadge>
        </View>
        <View className='at-col-1 at-icon at-icon-heart'
          style={{fontSize:'25px',textAlign:'right',lineHeight:'34px'}}
        />
        <View className='at-col-2 at-icon at-icon-star'
          style={{fontSize:'25px',textAlign:'center',lineHeight:'34px'}}
        />
      </View>
    </View>
  )
}

export default BottomBarInputBox;
