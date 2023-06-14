import {View} from "@tarojs/components";
import React, {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import PostItem from "../../components/PostItem/PostItem";

import {getCookies} from "../../utils";
import {AtSearchBar} from "taro-ui";
import {HOST} from "../../util/constants";

interface Props{

}

interface PostListItem {
  id: string,
  userId: string,
  title: string,
  content: string,
  type: number,
  status: number,
  createTime: string,
  commentCount: number,
  score: number,
  username: string,
  headerUrl: string,
  likeCount: number,
  likeStatus: boolean
}

const Result:React.FC<Props>=()=>{

  const [postList, setPostList] = useState<PostListItem[]>([]);
  const [key,setKey] = useState('')

  const getResult = async (keyword:string)=>{
    setKey(keyword)
    Taro.request({
      url:`${HOST}search`,
      data:{
        keyword: keyword,
        current:1,
        limit:5
      },
      header:{
        'Cookie':getCookies(),
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      success: (response)=>{
        setPostList(response.data.data.list)
      },
      fail:()=>{
        Taro.showToast({
          title: '搜索请求失败',
          icon:'error'
        })
      }
    })
  }

  useEffect(()=>{
    const { keyword } = Taro.getCurrentInstance().router?.params as any;
    getResult(keyword)
  },[])

  const handleSearch = ()=>{
    getResult(key)
  }

  const saveKeyword = (value)=>{
    setKey(value)
  }

  return (
    <>
      <AtSearchBar
        value={key}
        onChange={saveKeyword}
        onActionClick={handleSearch}
        focus
      />
      <View style={{padding: '0 20px 0 20px'}}>
        {
          postList?.map((post) => {
            return (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                date={post.createTime}
                author={{
                  userId:post.userId,
                  username: post.username,
                  headerUrl: post.headerUrl,
                  school: '西华大学',
                  major: '计算机'
                }}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                likeStatus={post.likeStatus}
              />
            )
          })
        }
      </View>
    </>
  )
}

export default Result
