import React, {useState} from 'react'
import { View } from '@tarojs/components'
import {AtActivityIndicator, AtDivider, AtForm, AtInput, AtList, AtListItem, AtSearchBar} from "taro-ui";
import Taro from "@tarojs/taro";
import './index.scss'

const Notice = ()=>{

  const handleDetail = ()=>{
    Taro.navigateTo({
      url: '/pages/detail/detail',
    })
  }
  const [keyword,setKeyword] = useState('');
  const handleSearch = (value)=>{
    setKeyword(value);
  }

  const handleChange = ()=>{

  }


  return (
    <>
      <AtSearchBar
        value={keyword}
        onChange={handleChange}
        onActionClick={handleSearch}
      />

      <View>
        {/*帖子列表*/}
        <AtList>
          <AtListItem
            title='2023年考研时间确定！'
            note='近日教育部公布了2023年考研时间，大家可以提前规划备考计划啦！'
            arrow='right'
            hasBorder={false}
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            onClick={handleDetail}
          />
          <AtListItem
            title='分享一个高效的阅读方法'
            note='备考考研需要大量阅读，我整理出来一种高效的阅读方法，希望可以帮到大家。'
            arrow='right'
            hasBorder={false}
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          />
          <AtListItem
            title='请问推荐一些好用的考研APP'
            note='最近在备考考研，想问问大家有什么好用的考研APP可以推荐吗？'
            arrow='right'
            hasBorder={false}
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          {/*分割线*/}
          <AtDivider content='上次阅读到这里' fontSize={24} height={45} fontColor='#CCC' />
          <AtListItem
            title='考研英语复习方法分享'
            note='英语是考研中的难点，我整理了一些复习方法，分享给大家。'
            arrow='right'
            hasBorder={false}
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          />
          <AtListItem
            title='2023年考研政治备考资料分享'
            note='政治是考研必考科目之一，我整理了一些资料分享给大家，希望能帮到大家。'
            arrow='right'
            hasBorder={false}
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          />
        </AtList>
      </View>
    </>

  )
}

export default Notice;
