import { View} from "@tarojs/components";
import { AtDivider} from "taro-ui";
import React, {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import ChatItem from "../../components/ChatItem/ChatItem";

import './chat.scss'
import {getCookies} from "../../utils";
import {UserInfo} from "../../interfaces/userInfo";

interface Props{

}

interface Letter{
  fromUser: UserInfo,
  letter:{
    id:number,
    fromId:number,
    toId:number,
    conversationId:string,
    content:string,
    createTime:string
  }
}

const Chat:React.FC<Props>=()=>{

  const [letterList,setLetterList] = useState<Letter[]>([])

  useEffect(()=>{
    const { conversationId,name } = Taro.getCurrentInstance().router?.params as any;
    Taro.setNavigationBarTitle({
      title: name
    })
    Taro.request({
      url:`http://localhost:8079/community/letter/detail/${conversationId}`,
      data:{
        offset:1,
        limit:5
      },
      header:{
        'Cookie':getCookies()
      },
      success:(response)=>{
        Taro.showToast({
          title:'对话加载成功'
        })
        const list = response.data.data.letters.map((item)=>({
          fromUser:{
            id:item.fromUser.id,
            username:item.fromUser.username,
            headerUrl:item.fromUser.headerUrl,
            createTime:item.fromUser.createTime
          },
          letter:{
            id:item.letter.id,
            fromId:item.letter.fromId,
            toId:item.letter.toId,
            conversationId:item.letter.conversationId,
            content:item.letter.content,
            createTime: item.letter.createTime
          }
        })).reverse()
        setLetterList(list)
      }
    })
  },[])
  return (
    <>
    <View style={{letterSpacing:'1px',lineHeight:1.5,padding:'0 10px'}}>
      <AtDivider content='以下是最新消息' fontSize={24} height={80} fontColor='#CCC' />
      {
        letterList.map((item,index)=>{
          const id = Taro.getStorageSync('userId')
          return (
            <ChatItem key={index} type={item.fromUser.id === id}
              message={item.letter.content}
              fromUser={item.fromUser}
              createTime={item.letter.createTime}
            />
          )
        })
      }
    </View>
      {/*底栏*/}
      <View className='bottom_bar' style={{zIndex: 450}}>
        <View style={{margin:'10px 8px 35px 5px'}} className='at-row'>
          <View className='at-row at-row__justify--center at-col-9'>
            <View className='commentContent at-col at-col-10'>
              说两句…
            </View>
          </View>
          <View className='at-col-1 at-icon at-icon-image'
            style={{fontSize:'25px',textAlign:'right',lineHeight:'34px'}}
          />
          <View className='at-col-2 at-icon at-icon-add-circle'
            style={{fontSize:'25px',textAlign:'center',lineHeight:'34px'}}
          />
        </View>
      </View>
    </>
  )
}

export default Chat;

