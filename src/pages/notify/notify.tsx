import React, {useState} from "react";
import {View} from "@tarojs/components";
import Taro, {useDidShow} from "@tarojs/taro";
import {getCookies} from "../../utils";
import NotifyItem from "../../components/NotifyItem/NotifyItem";
import {UserInfo} from "../../interfaces/userInfo";
import {HOST} from "../../util/constants";

interface Props{

}

interface ListItem{
  entityType:number,
  entityId:number,
  postId:number,
  user:UserInfo,
  createTime:string
}

const Notify:React.FC<Props>=()=>{

  const [list,setList] = useState<ListItem[]>()
  const [topic,setTopic] = useState('')

  useDidShow(async ()=>{
    const { type } = Taro.getCurrentInstance().router?.params as any;
    setTopic(type)
    if(Taro.getStorageSync('ticket')) {
      await Taro.request({
        url: `${HOST}notice/detail/${type}`,
        data:{
          offset:1,
          limit:5
        },
        header: {
          'Cookie': getCookies()
        },
        success: (response) => {
          const code = response.data.code
          if (code === 200) {
            const listRow = response.data.data.map((item)=>({
              entityType:item.entityType,
              entityId:item.entityId,
              postId:item.postId,
              user:{
                id:item.user.id,
                username:item.user.username,
                headerUrl:item.user.headerUrl
              },
              createTime:item.notice.createTime
            }))
            setList(listRow)
            Taro.showToast({
              title: '获取列表成功'
            })
          } else {
            Taro.showToast({
              title: '获取列表失败'
            })
          }
        }
      })
    }
  })

  return (
    <View>
      {
        list?.map((item,index)=>{
          return (
            <NotifyItem key={index}
              topic={topic}
              user={item.user}
              time={item.createTime}
              entityId={item.entityId}
              entityType={item.entityType}
            />
          )
        })
      }
    </View>
  )
}

export default Notify
