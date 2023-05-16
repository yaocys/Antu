import {Form, Input, View} from "@tarojs/components";
import ChatItem from "../../components/ChatItem/ChatItem";
import {AtBadge, AtButton, AtDivider, AtFloatLayout, AtTextarea} from "taro-ui";
import React from "react";

import './chat.scss'

interface Props{

}

const Chat:React.FC<Props>=()=>{
  return (
    <>
    <View style={{letterSpacing:'1px',lineHeight:1.5,padding:'0 10px'}}>
      <ChatItem type message='这是我发出的消息' />
      <AtDivider content='以下是最新消息' fontSize={24} height={80} fontColor='#CCC' />
      <ChatItem type={false} message='而这是对方发出的消息，我希望这条文本足够长以观察换行的情况' />
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

