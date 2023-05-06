import Taro, {eventCenter} from '@tarojs/taro'
import {FC} from 'react'
import {connect} from "react-redux";
import {View, Text, Image} from '@tarojs/components'

import Timeago ,{Thread_DETAIL_NAVIGATE} from '../utils'


interface ThreadProps {
  tid: string;
  not_navi?: boolean;
  title: string;
  member: {
    avatar_large: string;
    username: string;
    avatar_normal: string
  };
  last_modified: number;
  replies: number;
  node: {
    title: string;
  };
}

export const Thread: FC<ThreadProps> = ({
                                   tid, not_navi,
                                   title, member,
                                   last_modified, replies,
                                   node
                                 }) => {
  const handleNavigate = () => {
    if (not_navi) return;
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, {tid, not_navi, title, member, last_modified, replies, node})
    // 跳转到帖子详情
    Taro.navigateTo({
      url: '/pages/detail/index',
    })
  }
  const time = Timeago.format(last_modified * 1000, 'zh')
  const usernameCls = `author ${not_navi ? 'bold' : ''}`

  return (
    <View className='thread' onClick={handleNavigate}>
      <View className='info'>
        <View>
          <Image src={member.avatar_large} className='avatar' />
        </View>
        <View className='middle'>
          <View className={usernameCls}>{member.username}</View>
          <View className='replies'>
            <Text className='mr10'>{time}</Text>
            <Text>评论 {replies}</Text>
          </View>
        </View>
        <View className='node'>
          <Text className='tag'>{node.title}</Text>
        </View>
      </View>
      <Text className='title'>{title}</Text>
    </View>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    setThread: thread => dispatch({type: 'SET_CURRENT_THREAD', thread})
  }
}
export default connect(null,mapDispatchToProps)(Thread);
