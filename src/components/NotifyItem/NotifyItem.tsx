import {Text, View} from "@tarojs/components";
import {AtButton, AtCard} from "taro-ui";
import moment from "moment";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import { UserInfo } from '../../interfaces/userInfo';

interface Props{
  topic: string,
  entityType,
  entityId,
  user:UserInfo
  time:string
}

const NotifyItem:React.FC<Props>=({topic,user,time,entityType})=>{

  const {id,username,headerUrl} = user;

  const [des,setDes] = useState('')

  useEffect(()=>{
    // 对象字面量
    const descriptions = {
      like: `点赞了你的${entityType === 1 ? '帖子' : '回复'}`,
      comment: `评论了你的${entityType === 1 ? '帖子' : '回复'}`,
      follow: '关注了你',
    };
    setDes(descriptions[topic]);
  },[])

  const handleProfile = () => {
    Taro.navigateTo({
      url: `/pages/profile/profile?id=${id}`,
    })
  }

  return (
    <View style={{marginTop:'10px'}}>
      <AtCard extra={des}
        title={username}
        thumb={headerUrl}
      >
        <View className='at-row at-row__justify--between'>
          <Text style={{display:'flex',alignItems:'center'}}>
            时间：{moment(time).format("YYYY-MM-DD HH:mm")}
          </Text>
          <View style={{all:"unset"}} className='at-col-3'>
            <AtButton type='secondary' size='small' onClick={handleProfile}>点击查看</AtButton>
          </View>
        </View>
      </AtCard>
    </View>
  )
}

export default NotifyItem
