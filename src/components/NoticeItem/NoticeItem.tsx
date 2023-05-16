import {Text, View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import moment from "moment/moment";
import React from "react";
import Taro from "@tarojs/taro";

interface NoticeProps{
  user:{
    id:number,
    username: string,
    headerUrl:string,
  }
}

const NoticeItem:React.FC<NoticeProps>=({user})=>{

  const {id,username,headerUrl} = user;

  const handleDetail = ()=>{
    Taro.navigateTo({
      url:"/pages/chat/chat"
    })
  }

  return (
    <View className='' style={{padding: '10px 10px', borderBottom: '1px solid #dfe6e9'}} onClick={handleDetail}>
      {/*帖子作者信息*/}
      <View className='at-row at-row__justify--center' style={{marginBottom: '5px'}}>
        <View className='at-col-2'>
          <AtAvatar circle image={headerUrl} size='small' />
        </View>
        <View className='at-col-7' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{fontWeight: 'bold', fontSize: 'small', marginBottom: '5px'}}>
            {username}
          </View>
          <View style={{fontSize: 'small', color: '#b2bec3'}}>
            学长你好，可以了解下院校情况吗
          </View>
        </View>
        <View className='at-col-3' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{fontSize: 'x-small', color: '#b2bec3',textAlign:'right'}}>
            {moment().format("YYYY/MM/DD")}
          </View>
          <View style={{fontSize: 'medium', color: '#b2bec3',textAlign:'right'}}>
            4/13
          </View>
        </View>
      </View>
    </View>
  )
}

export default NoticeItem;
