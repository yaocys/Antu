import React, {useEffect, useState} from "react";
import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components';
import Taro, {useReachBottom, usePullDownRefresh} from "@tarojs/taro";
import {AtDivider, AtTabsPane, AtTabs, AtNoticebar, AtSearchBar, AtActivityIndicator, AtFab} from "taro-ui";

import PostItem from "../../components/PostItem/PostItem";

import './index.scss'
import {getCookies} from "../../util/utils";

const PAGE_SIZE = 5

interface Props {

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

const Index: React.FC<Props> = () => {


  const tab_list = [
    {title: '关注'},
    {title: '最新'},
    {title: '推荐'},
    {title: '招生'},
    {title: '院校'},
    {title: '留学'},
    {title: '资料'}
  ];

  const [postList, setPostList] = useState<PostListItem[]>([]);// 帖子列表
  const [loading, setLoading] = useState(false);// 加载状态
  const [pageNum, setPageNum] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState('');

  /**
   * 切换不同的页签
   */
  const switchTag = (value) => {
    setCurrent(value)
  }

  const handleSearch = (value) => {
    setKeyword(value);
  }

  usePullDownRefresh(() => {
    console.log('正在下拉刷新')
  })

  useReachBottom(() => {
    getPostList();
  })

  const getPostList = async () => {
    if (!hasNextPage || loading) return;
    setLoading(true);
    try {
      const response = await Taro.request({
        url: "http://localhost:8079/community/index",
        data: {
          offset: pageNum + 1,
          limit: PAGE_SIZE
        },
        header:{
          'Cookie': getCookies()
        },
        complete: () => {
          setLoading(false);
        }
      });
      setPostList(postList.concat(response.data.data.list));
      setPageNum(response.data.data.pageNum);
      setHasNextPage(response.data.data.hasNextPage)
    } catch (error) {
      Taro.showToast({
        title: '帖子加载失败'
      })
    }
  }

  /**
   * 相当于componentDidMount和componentDidShow
   */
  useEffect(() => {
    getPostList();
  }, []);

  const handleEdit = ()=>{

  }

  return (
    <View className='index'>
      {/*搜索*/}
      <AtSearchBar
        value={keyword}
        onChange={handleSearch}
      />

      <AtTabs
        current={current}
        tabList={tab_list}
        onClick={switchTag}
        scroll
      >
        <AtTabsPane current={current} index={0}>
          <View style={{fontSize: '18px', textAlign: 'center'}}>
            这里是关注的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style={{fontSize: '18px'}}>

            {/*轮播图*/}
            <Swiper
              className='test-h'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              vertical={false}
              circular
              indicatorDots
              autoplay
              style={{margin: '5px 10px'}}
            >
              <SwiperItem>
                <View className='demo-text-1'>
                  <Image src='https://yaos.cc/img/pic11.png'
                         style={{objectFit: 'cover', width: '100%'}}
                  />
                </View>
              </SwiperItem>
              <SwiperItem>
                <View className='demo-text-2'>
                  <Image src='https://yaos.cc/img/pic2.png'
                         style={{objectFit: 'cover', width: '100%'}}
                  />
                </View>
              </SwiperItem>
              <SwiperItem>
                <View className='demo-text-3'>
                  {/*{require('../../pic/Surface Laptop 2 - Default.jpg')}*/}
                  <Image src='https://yaos.cc/img/pic3.png'
                         style={{objectFit: 'cover', width: '100%'}}
                  />
                </View>
              </SwiperItem>
            </Swiper>

            {/*通告栏*/}
            <AtNoticebar icon='volume-plus' single={false} close showMore moreText='查看公约'>
              欢迎加入岸途，点击 这里 查看我们的社区公约
            </AtNoticebar>

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
                        username: post.username,
                        headerUrl: post.headerUrl,
                        school: '西华大学',
                        major: '计算机'
                      }}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                    />
                  )
                })
              }
            </View>
            {
              loading && <View style={{position: 'relative', height: '30px'}}>
                <AtActivityIndicator mode='center' isOpened content='加载中…'></AtActivityIndicator>
              </View>
            }
            {
              !hasNextPage && <AtDivider content='没有更多的数据了' fontSize={24} height={45} fontColor='#CCC' />
            }
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style={{fontSize: '18px', textAlign: 'center'}}>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
      <View style={{position:'fixed',bottom:'40px',right:'20px'}}>
        <AtFab onClick={handleEdit} size='small'>
          <Text className='at-fab__icon at-icon at-icon-edit' />
        </AtFab>
      </View>
    </View>
  )
}

export default Index;
