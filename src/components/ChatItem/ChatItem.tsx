import {View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import moment from "moment";
import {useEffect} from "react";

import './ChatItem.scss'
import {UserInfo} from "../../interfaces/userInfo";

interface Props{
  type: boolean,
  message:string,
  fromUser: UserInfo,
  createTime:string
}
const ChatItem:React.FC<Props>=({type,message,fromUser,createTime})=>{

  useEffect(()=>{
    console.log(fromUser)
  })

  const {id,username,headerUrl} = fromUser;

  if(type){
    // 我发的消息，右边
    return (
      <>
        <View className='at-row'>
        <View className='at-col-2' />
        <View className='at-col-8' style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          <View className='chat-bubble-right'>
            {message}
          </View>
        </View>
        <View className='at-col-2 message-avatar'>
          <AtAvatar size='small' circle image={headerUrl} />
        </View>
      </View>
        <View className='at-row'>
          <View className='at-col-10'>
            <View style={{fontSize:'xx-small',color:'#b2bec3',
              height:'20px',padding:'0 10px',display:"flex",alignItems:'flex-start',justifyContent:'flex-end',
            marginBottom:'5px'}}
            >
              {moment(createTime).format("YYYY-MM-DD HH:mm")}
            </View>
          </View>
          <View className='at-col-2' />
        </View>
      </>
    )
  }else return (
<>
  <View className='at-row'>
    <View className='at-col-2 message-avatar'>
      <AtAvatar size='small' circle image={headerUrl} />
    </View>
    <View className='at-col-8' style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}} >
      <View className='chat-bubble-left'>
        {message}
      </View>
    </View>
    <View className='at-col-2' />
  </View>
  <View style={{fontSize:'xx-small',color:'#b2bec3',height:'20px',padding:'0 10px',display:"flex",alignItems:'flex-start',
  marginBottom:'5px'}}
    className='at-col__offset-2'
  >
    {moment(createTime).format("YYYY-MM-DD HH:mm")}
  </View>
</>
  )
}

export default ChatItem;
