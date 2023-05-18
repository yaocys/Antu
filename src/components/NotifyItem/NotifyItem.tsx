import {Text, View} from "@tarojs/components";
import {AtButton, AtCard} from "taro-ui";
import moment from "moment";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";

interface Props{
  topic: string,
  entityType,
  entityId,
  user:{
    id:number,
    username:string,
    headerUrl:string,
  }
  time:string
}

const NotifyItem:React.FC<Props>=({topic,user,time,entityType,entityId})=>{

  const {id,username,headerUrl} = user;

  const [des,setDes] = useState('')

  useEffect(()=>{
    switch (topic){
      case 'like':
        setDes(`点赞了你的${entityType==1?'帖子':'回复'}`)
        break
      case 'comment':
        setDes(`评论了你的${entityType==1?'帖子':'回复'}`)
        break
      case 'follow':
        setDes('关注了你')
        break
    }
  },[])

  const handleProfile = () => {
    Taro.navigateTo({
      url: `/pages/profile/profile?id=${id}`,
    })
  }

  return (
    <View style={{marginTop:'10px'}}>
      <AtCard
        extra={des}
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
