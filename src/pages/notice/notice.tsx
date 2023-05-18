import React, {useEffect, useState} from 'react'
import { View } from '@tarojs/components'
import {
  AtActivityIndicator,
  AtButton,
  AtDivider,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtSearchBar,
  AtSegmentedControl
} from "taro-ui";
import Taro, {useDidShow} from "@tarojs/taro";
import './index.scss'
import {getCookies} from "../../utils";
import NoticeItem from "../../components/NoticeItem/NoticeItem";

interface Message{
  id:number,
  fromId:number,
  toId:number,
  conversationId:string,
  status:number,
  content:string,
  createTime:string
}

interface User{
  id:number,
  username:string,
  headerUrl:string
}

interface Notice{
  count:number,
  entityId:number,
  entityType:number,
  message:Message,
  postId:number,
  unread:string,
  user:User
}

const Notice = ()=>{

  const [letterUnreadCount,setLetterUnreadCount] = useState(' ');
  const [noticeUnreadCount,setNoticeUnreadCount] = useState(' ');
  const [commentNotice,setCommentNotice] = useState<Notice>();
  const [likeNotice,setLikeNotice] = useState<Notice>();
  const [followNotice,setFollowNotice] = useState<Notice>();
  const [current,setCurrent] = useState(0);

  const [keyword,setKeyword] = useState('');
  const handleSearch = (value)=>{
    setKeyword(value);
  }

  useEffect(()=>{
    Taro.hideTabBarRedDot({
      index:1
    })
  })

  const handleChange = ()=>{

  }

  useDidShow(async ()=>{
    if(Taro.getStorageSync('ticket')) {
      await Taro.request({
        url:'http://localhost:8079/community/notice/list',
        header:{
          'Cookie':getCookies()
        },
        success:(response)=>{
          const code = response.data.code
          const data = response.data.data
          if(code===200){
            setLetterUnreadCount(data.letterUnreadCount)
            setNoticeUnreadCount(data.noticeUnreadCount)
            setCommentNotice(data.commentNotice)
            setLikeNotice(data.likeNotice)
            setFollowNotice(data.followNotice)
            Taro.showToast({
              title: '获取列表成功'
            })
          }else {
            Taro.showToast({
              title: '获取列表失败'
            })
          }
        }
      })
      await Taro.request({
        url:'http://localhost:8079/community/letter/list',
        data:{
          offset: 1,
          limit: 100000
        },
        header:{
          'Cookie':getCookies()
        },
        success:(response)=>{
          const code = response.data.code
          const data = response.data.data
          if(code===200){
            Taro.showToast({
              title: '获取私信列表成功'
            })
          }else {
            Taro.showToast({
              title: '获取私信列表失败'
            })
          }
        }
      })
    }else {
      // 没登陆就跳转到登录页
/*      Taro.navigateTo({
        url :'/pages/login/login'
      })*/
    }
  })

  const handleDetail = (type:string)=>{
    Taro.navigateTo({
      url:`/pages/notify/notify?type=${type}`
    })
  }

  const handleClick = (value)=>{
    setCurrent(value)
  }

  return (
    <>
      <AtSearchBar
        value={keyword}
        onChange={handleChange}
        onActionClick={handleSearch}
      />

      <View style={{padding: '0 10px'}}>
        {/*<AtButton type='secondary' size='small'>一键已读</AtButton>*/}
        {/*帖子列表*/}
        <AtSegmentedControl
          values={[`系统通知（${noticeUnreadCount}）`, `用户私信（${letterUnreadCount}）`]}
          onClick={handleClick}
          current={current}
        />
        {
          current === 0
            ? <View className='tab-content'>
              <AtList>
                <AtListItem
                  title='评论'
                  note='用户 张三 评论了你的帖子'
                  arrow='right'
                  hasBorder={false}
                  thumb='http://static.nowcoder.com/images/head/reply.png'
                  onClick={()=>handleDetail('comment')}
                  extraText={`${commentNotice?.unread}/${commentNotice?.count}`}
                />
                <AtListItem
                  title='点赞'
                  note='用户 李四 点赞了你的帖子'
                  arrow='right'
                  hasBorder={false}
                  thumb='http://static.nowcoder.com/images/head/like.png'
                  onClick={()=>handleDetail('like')}
                  extraText={`${likeNotice?.unread}/${likeNotice?.count}`}
                />
                <AtListItem
                  title='关注'
                  note='用户 王五 关注了你'
                  arrow='right'
                  hasBorder={false}
                  thumb='http://static.nowcoder.com/images/head/follow.png'
                  onClick={()=>handleDetail('follow')}
                  extraText={`${followNotice?.unread}/${followNotice?.count}`}
                />
              </AtList>
            </View>
            : null
        }
        {
          current === 1
            ? <View className='tab-content'>
              <NoticeItem user={{
                id:13,
                username:'张三',
                headerUrl:'http://static.nowcoder.com/images/head/reply.png'}}
              />
              <NoticeItem user={{
                id:13,
                username:'张三',
                headerUrl:'http://static.nowcoder.com/images/head/reply.png'}}
              />
              <NoticeItem user={{
                id:13,
                username:'张三',
                headerUrl:'http://static.nowcoder.com/images/head/reply.png'}}
              />
            </View>
            : null
        }
      </View>
    </>

  )
}

export default Notice;
