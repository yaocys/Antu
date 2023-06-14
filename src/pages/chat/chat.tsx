import {View} from "@tarojs/components";
import {AtButton, AtDivider, AtForm, AtTextarea} from "taro-ui";
import React, {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import ChatItem from "../../components/ChatItem/ChatItem";

import './chat.scss'
import {getCookies} from "../../utils";
import {UserInfo} from "../../interfaces/userInfo";
import {HOST} from "../../util/constants";

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
  const [editInput,setEditInput] = useState('');
  const [toName,setToName] = useState('')
  const [id,setId] = useState('')

  const getChat = (chatId)=>{
    Taro.request({
      url:`${HOST}letter/detail/${chatId}`,
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
  }

  useEffect(()=>{
    const { conversationId,name } = Taro.getCurrentInstance().router?.params as any;
    setToName(name)
    setId(conversationId)
    Taro.setNavigationBarTitle({
      title: name
    })
    getChat(conversationId)
  },[])


  const saveEditInput = (value)=>{
    setEditInput(value)
    return value;
  }

  const handleSubmit = async ()=>{
    await Taro.request({
      url: `${HOST}letter/send`,
      method:'POST',
      data:{
        toName: toName,
        content:editInput
      },
      header:{
        "Content-Type": 'application/x-www-form-urlencoded',
        'Cookie':getCookies()
      },
      success:()=>{
        getChat(id)
      }
    })
  }

  return (
    <>
    <View style={{letterSpacing:'1px',lineHeight:1.5,padding:'0 10px'}}>
      <AtDivider content='以下是最新消息' fontSize={24} height={80} fontColor='#CCC' />
      {
        letterList.map((item,index)=>{
          const id2 = Taro.getStorageSync('userId')
          return (
            <ChatItem key={index} type={item.fromUser.id === id2}
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
        <View style={{margin:'10px 8px 45px 8px',display:'flex',justifyContent:'center',alignItems:'center'}} className='at-row'>
          <AtForm className='at-row at-row__justify--center at-col-7'>
            <AtTextarea
              value={editInput}
              onChange={saveEditInput}
              height={32}
              count={false}
            />
          </AtForm>
          <View className='at-col-2 at-icon at-icon-image'
            style={{fontSize:'30px',textAlign:'center',lineHeight:'34px'}}
          />
          <View className='at-col-3 at-row'>
            <View className='at-col-10'>
              <AtButton type='primary' size='small' onClick={handleSubmit}>发送</AtButton>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default Chat;

