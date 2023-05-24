import React, {useEffect, useState} from 'react'
import { View } from '@tarojs/components'
import {
  AtList,
  AtListItem,
  AtSearchBar,
  AtSegmentedControl, AtSwipeAction
} from "taro-ui";
import Taro, {useDidShow} from "@tarojs/taro";
import './index.scss'
import {getCookies} from "../../utils";
import NoticeItem from "../../components/NoticeItem/NoticeItem";
import {UserInfo} from "../../interfaces/userInfo";

interface Message{
  id:number,
  fromId:number,
  toId:number,
  conversationId:string,
  status:number,
  content:string,
  createTime:string
}

interface Notice{
  count:number,
  entityId:number,
  entityType:number,
  message:Message,
  postId:number,
  unread:string,
  user:UserInfo
}

interface Chat{
  id:number,
  fromId:number,
  toId:number,
  conversationId:string,
  content:string,
  createTime:string,
  letterCount:number,
  unreadCount:number,
  target:UserInfo
}

interface Props{

}

const Notice:React.FC<Props> = ()=>{

  const [letterUnreadCount,setLetterUnreadCount] = useState(' ');
  const [noticeUnreadCount,setNoticeUnreadCount] = useState(' ');
  const [commentNotice,setCommentNotice] = useState<Notice>();
  const [likeNotice,setLikeNotice] = useState<Notice>();
  const [followNotice,setFollowNotice] = useState<Notice>();
  const [current,setCurrent] = useState(0);
  const [letterList,setLetterList] = useState<Chat[]>([])

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
          limit: 5
        },
        header:{
          'Cookie':getCookies()
        },
        success:(response)=>{
          const code = response.data.code
          if(code===200){
            setLetterList(response.data.data.conversations.list)
/*            const list = response.data.data.conversations.list.map((item)=>({
              id:item.id,
              fromId:item.fromId,
              toId:item.toId,
              conversationId:item.conversationId,
              content:item.content,
              createTime:item.createTime,
              letterCount:item.letterCount,
              unreadCount:item.unreadCount,
              target:{
                id:item.target.id,
                username:item.target.username,
                headerUrl:item.target.headerUrl,
                createTime:item.target.createTime
              }
            }))
            setLetterList(list)*/
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
                {
                  // 通知不为空才显示
                  commentNotice&&<AtListItem
                    title='评论'
                    note='用户 张三 评论了你的帖子'
                    arrow='right'
                    hasBorder={false}
                    thumb='http://static.nowcoder.com/images/head/reply.png'
                    onClick={()=>handleDetail('comment')}
                    extraText={`${commentNotice?.unread}/${commentNotice?.count}`}
                  />
                }
                {
                  likeNotice && <AtListItem
                    title='点赞'
                    note='用户 李四 点赞了你的帖子'
                    arrow='right'
                    hasBorder={false}
                    thumb='http://static.nowcoder.com/images/head/like.png'
                    onClick={()=>handleDetail('like')}
                    extraText={`${likeNotice?.unread}/${likeNotice?.count}`}
                  />
                }
{/*                <AtSwipeAction options={[
                  {
                    text: '删除',
                    style: {
                      backgroundColor: '#FF4949',
                      width: 36
                    }
                  }
                ]} areaWidth={Taro.getSystemInfoSync().screenWidth} maxDistance={60}
                >
                  <AtListItem title='Item2' />
                </AtSwipeAction>*/}
                {
                  followNotice && <AtListItem
                    title='关注'
                    note='用户 王五 关注了你'
                    arrow='right'
                    hasBorder={false}
                    thumb='http://static.nowcoder.com/images/head/follow.png'
                    onClick={()=>handleDetail('follow')}
                    extraText={`${followNotice?.unread}/${followNotice?.count}`}
                  />
                }
              </AtList>
            </View>
            : null
        }
        {
          current === 1
            ? <View className='tab-content'>
              {
                letterList.map((letter)=>(
                  <NoticeItem user={{
                    id:letter.target.id,
                    username:letter.target.username,
                    headerUrl:letter.target.headerUrl,
                  }}
                    content={letter.content}
                    createTime={letter.createTime}
                    letterCount={letter.letterCount}
                    unreadCount={letter.unreadCount}
                    conversationId={letter.conversationId}
                  />
                ))
              }
            </View>
            : null
        }
      </View>
    </>

  )
}

export default Notice;
