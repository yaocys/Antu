import React, {useEffect, useState} from "react";
import {Image, Swiper, SwiperItem, View} from '@tarojs/components';
import Taro, { useReachBottom,usePullDownRefresh } from "@tarojs/taro";
import {AtDivider, AtTabsPane, AtTabs, AtNoticebar, AtSearchBar, AtActivityIndicator} from "taro-ui";

import PostItem from "../../components/PostItem/PostItem";

import './index.scss'

const PAGE_SIZE = 5

interface Props{

}

interface PostListItem{
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
  const [pageNum,setPageNum] = useState(0);
  const [hasNextPage,setHasNextPage] = useState(true);
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

  usePullDownRefresh(()=>{
    console.log('正在下拉刷新')
  })

  useReachBottom(()=>{
    console.log('已经到最底下了')
    getPostList();
  })

  const getPostList = async () => {
    if(!hasNextPage||loading) return;
    setLoading(true);
    try {
      const response = await Taro.request({
        url: "https://yaos.cc/community/index",
        data: {
          offset: pageNum+1,
          limit: PAGE_SIZE
        },
        complete:()=>{
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

  return (
    <View className='index'>
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

            {/*通告栏*/}
            <AtNoticebar icon='volume-plus' single={false} close showMore moreText='查看公约'>
              欢迎加入岸途，点击 这里 查看我们的社区公约
            </AtNoticebar>

            <AtSearchBar
              value={keyword}
              onChange={handleSearch}
            />

            {/*轮播图*/}
            <Swiper
              className='test-h'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              vertical={false}
              circular
              indicatorDots
              autoplay
            >
              <SwiperItem>
                <View className='demo-text-1'>
                  <Image src={require('../../pic/Surface Duo - Blue Sky.jpg')}
                    style={{objectFit: 'cover', width: '100%'}}
                  />
                </View>
              </SwiperItem>
              <SwiperItem>
                <View className='demo-text-2'>
                  <Image src={require('../../pic/Surface Family.jpg')}
                    style={{objectFit: 'cover', width: '100%'}}
                  />
                </View>
              </SwiperItem>
              <SwiperItem>
                <View className='demo-text-3'>
                  <Image src={require('../../pic/Surface Laptop 2 - Default.jpg')}
                    style={{objectFit: 'cover', width: '100%'}}
                  />
                </View>
              </SwiperItem>
            </Swiper>

            <View style={{padding: '0 20px 0 20px'}}>
              {
                postList?.map((post) => {
                  return (
                    <PostItem
                      key={post.id}
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
              loading && <View style={{position:'relative',height:'30px'}}>
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
    </View>
  )
}

export default Index;
