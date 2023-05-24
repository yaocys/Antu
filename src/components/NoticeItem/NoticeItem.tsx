import {View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import moment from "moment/moment";
import React from "react";
import Taro from "@tarojs/taro";
import {handleProfile} from "../../utils";

interface NoticeProps{
  content:string,
  createTime:string,
  user:{
    id:number,
    username: string,
    headerUrl:string,
  },
  letterCount,
  unreadCount,
  conversationId
}

const NoticeItem:React.FC<NoticeProps>=({user,content,createTime,letterCount,unreadCount,conversationId})=>{

  const {id,username,headerUrl} = user;

  const handleDetail = ()=>{
    Taro.navigateTo({
      url:`/pages/chat/chat?conversationId=${conversationId}&name=${username}`
    })
  }

  return (
    <View className='' style={{padding: '10px 10px', borderBottom: '1px solid #dfe6e9'}} onClick={handleDetail}>
      {/*帖子作者信息*/}
      <View className='at-row at-row__justify--center' style={{marginBottom: '5px'}}>
        <View className='at-col-2' onClick={()=>handleProfile(id)}>
          <AtAvatar circle image={headerUrl} size='small' />
        </View>
        <View className='at-col-7' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{fontWeight: 'bold', fontSize: 'small', marginBottom: '5px'}}>
            {username}
          </View>
          <View style={{fontSize: 'small', color: '#b2bec3'}}>
            {content}
          </View>
        </View>
        <View className='at-col-3' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{fontSize: 'x-small', color: '#b2bec3',textAlign:'right'}}>
            {moment(createTime).format("YYYY/MM/DD")}
          </View>
          <View style={{fontSize: 'medium', color: '#b2bec3',textAlign:'right'}}>
            {`${letterCount}/${unreadCount}`}
          </View>
        </View>
      </View>
    </View>
  )
}

export default NoticeItem;
