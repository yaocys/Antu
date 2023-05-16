import {View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";

import './ChatItem.scss'

interface Props{
  type: boolean,
  message:string
}
const ChatItem:React.FC<Props>=({type,message})=>{
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
          <AtAvatar size='small' circle image='https://jdc.jd.com/img/200' />
        </View>
      </View>
        <View className='at-row'>
          <View className='at-col-10'>
            <View style={{fontSize:'xx-small',color:'#b2bec3',
              height:'20px',padding:'0 10px',display:"flex",alignItems:'flex-start',justifyContent:'flex-end',
            marginBottom:'5px'}}
            >
              2022-4-7 14:15
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
      <AtAvatar size='small' circle image='https://jdc.jd.com/img/200' />
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
    2022-4-7 14:15
  </View>
</>
  )
}

export default ChatItem;
