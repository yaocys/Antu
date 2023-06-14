import {Text, View} from "@tarojs/components";
import moment from "moment/moment";
import {AtAvatar, AtButton, AtSegmentedControl, AtTag} from "taro-ui";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import FolloweeCard from "../../components/FolloweeCard/FolloweeCard";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import {getCookies} from "../../utils";
import {UserInfo} from "../../interfaces/userInfo";
import {HOST} from "../../util/constants";


interface Props{

}

interface ListItem{
  user: UserInfo,
  followTime:string,
  hasFollow:boolean
}

const Publish:React.FC<Props>=()=>{

  const [current,setCurrent] = useState<number>(2);
  const [userInfo,setUserInfo] = useState<UserInfo>();
  const [likeCount,setLikeCount] = useState(0);
  const [followeeCount,setFolloweeCount] = useState(0);
  const [followerCount,setFollowerCount] = useState(0);// 粉丝
  const [hasFollowed,setHasFollowed] = useState(false);

  const [followeeList,setFolloweeList] = useState<ListItem[]>()
  const [followerList,setFollowerList] = useState<ListItem[]>()
  const handleSwitch = (value)=>{
    setCurrent(value)
  }

  const getUserInfo = async (id:string)=>{
    await Taro.request({
      url: `${HOST}user/profile/${id}`,
      header:{
        'Cookie': getCookies()
      },
      success:(res)=>{
        const data= res.data.data
        const userVO = data.userVO
        setUserInfo({
          id:userVO.id,
          username:userVO.username,
          headerUrl: userVO.headerUrl,
          createTime:userVO.createTime
        })
        setLikeCount(data.likeCount)
        setFolloweeCount(data.followeeCount)
        setFollowerCount(data.followerCount)
        setHasFollowed(data.hasFollowed)
      },
      fail:()=>{
        Taro.showToast({
          title:'加载失败',
          icon:'error'
        })
      }
    })
  }

  // TODO 这里的列表没有做分页
  const getFollow=async (id:string)=>{
    await Taro.request({
      url: `${HOST}followees/${id}`,
      header:{
        'Cookie': getCookies()
      },
      data:{
        offset:0,
        limit:100
      },
      success:(res)=>{
        const list= res.data.data.list.map((item)=>({
          user:{
            id:item.user.id,
            username: item.user.username,
            headerUrl:item.user.headerUrl,
            createTime:item.user.createTime
          },
          followTime:item.followTime,
          hasFollow:item.hasFollow
        }))
        setFolloweeList(list)
      },
      fail:()=>{
        Taro.showToast({
          title:'加载失败',
          icon:'error'
        })
      }
    })
    await Taro.request({
      url: `${HOST}followers/${id}`,
      header:{
        'Cookie': getCookies()
      },
      data:{
        offset:0,
        limit:100
      },
      success:(res)=>{
        const list= res.data.data.list.map((item)=>({
          user:{
            id:item.user.id,
            username: item.user.username,
            headerUrl:item.user.headerUrl,
            createTime:item.user.createTime
          },
          followTime:item.followTime,
          hasFollow:item.hasFollow
        }))
        setFollowerList(list)
      },
      fail:()=>{
        Taro.showToast({
          title:'加载失败',
          icon:'error'
        })
      }
    })
  }

  useEffect( ()=>{
    const { id } = Taro.getCurrentInstance().router?.params as any;
    getUserInfo(id)
    getFollow(id)
  },[])

  const followed = ()=>{
    if (hasFollowed){
      return (
        <AtButton type='secondary' size='small' circle style={{fontSize: 'x-small'}} disabled>
          已关注
        </AtButton>
      )
    }else  return (
      <AtButton type='primary' size='small' circle style={{fontSize: 'x-small'}} onClick={handleFollow}>
        关注
      </AtButton>
    )
  }

  const handleFollow=()=>{
    setHasFollowed(true)
  }

  return (
    <View style={{backgroundColor:'#dfe6e9'}}>
      <View className='at-row at-row__justify--center'
        style={{backgroundColor:'white',paddingBottom:'10px'}}
      >
        <View className='at-col-3'>
          <AtAvatar circle image={userInfo?.headerUrl} size='large' />
        </View>
        <View className='at-col-5' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',lineHeight:1.5}}>
          <View style={{fontWeight: 'bolder', fontSize: 'large'}}>{userInfo?.username}</View>
          <View style={{fontSize: 'small', color: '#b2bec3'}}>上海财经大学 计算机类</View>
        </View>
        <View className='at-col-3 at-col__align--center'>
          {
            followed()
          }
        </View>
      </View>
      <View style={{padding:'0 20px',backgroundColor:'white',marginBottom:'5px'}}>
        <View style={{marginRight:'10px',display:'inline-block'}}>
          <AtTag active circle size='small'>Lv.39</AtTag>
        </View>
        <View style={{marginRight:'10px',display:'inline-block'}}>
          <AtTag active circle  size='small'>海归</AtTag>
        </View>
        <View style={{marginRight:'10px',display:'inline-block'}}>
          <AtTag active circle  size='small'>备考进行中</AtTag>
        </View>
        <View style={{fontSize:'small',color:'#636e72',letterSpacing:'1px'}}>
          <View style={{marginTop:'10px'}}>
            <Text style={{marginRight:'20px'}}>IP归属地：四川成都</Text>
            <Text>ID：{userInfo?.id}</Text>
          </View>
          <View  style={{marginTop:'10px',paddingBottom:'10px'}}>
            <Text style={{marginRight:'20px'}}>收到的赞：{likeCount}</Text>
            <Text>注册时间：{moment(userInfo?.createTime).format("YYYY-MM-DD")}</Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor:'white',padding:'10px'}}>
        <AtSegmentedControl
          values={[`帖子`, `评论`, `关注 ${followeeCount}`,`粉丝 ${followerCount}`]}
          onClick={handleSwitch}
          current={current}
        />
        {
          current === 0
            ? <View className='tab-content'>帖子</View>
            : null
        }
        {
          current === 1
            ? <View className='tab-content'>评论</View>
            : null
        }
        {
          current === 2
            ? <View className='tab-content'>
              {
                followeeList?.map((followee,index)=>{
                  return (
                    <FolloweeCard key={index}
                      id={followee.user.id}
                      username={followee.user.username}
                      headerUrl={followee.user.headerUrl}
                      followTime={followee.followTime}
                      hasFollowed={followee.hasFollow}
                    />
                  )
                })
              }
            </View>
            : null
        }
        {
          current === 3
            ? <View className='tab-content'>
              {
                followerList?.map((follower,index)=>{
                  return (
                    <FollowerCard key={index}
                      id={follower.user.id}
                      username={follower.user.username}
                      headerUrl={follower.user.headerUrl}
                      followTime={follower.followTime}
                      hasFollowed={follower.hasFollow}
                    />
                  )
                })
              }
            </View>
            : null
        }
      </View>
    </View>
  )
}

export default Publish;
