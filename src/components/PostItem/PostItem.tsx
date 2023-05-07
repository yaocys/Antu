import React from "react";
import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import moment from "moment";

interface PostItemProps {
  title: string,
  content: string,
  date: string,
  author: {
    username: string,
    headerUrl:string,
    school: string,
    major: string
  },
  likeCount: number,
  commentCount: number
}

const PostItem: React.FC<PostItemProps> = ({title,
                                             author,
                                             date,
                                             content,
                                             likeCount,
                                             commentCount}) => {

  const {username, school, major,headerUrl} = author;

  const handleDetail = () => {
    Taro.navigateTo({
      url: '/pages/detail/detail',
    })
  }

  return (
    <View className='' style={{margin: '10px 0', borderBottom: '1px solid #dfe6e9'}}>
      {/*帖子作者信息*/}
      <View className='at-row at-row__justify--center' style={{marginBottom: '5px'}}>
        <View className='at-col-2'>
          <AtAvatar circle image={headerUrl} size='small' />
        </View>
        <View className='at-col-10' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View
            style={{fontWeight: 'bold', fontSize: 'x-small', marginBottom: '3px'}}
          >{username}</View>
          <View style={{fontSize: '10px', color: '#b2bec3'}}>{school + ' ' + major +' '+moment(date).format("YYYY-MM-DD")}</View>
        </View>
      </View>
      {/*标题与内容*/}
      <View onClick={handleDetail}>
        <View style={{marginBottom: '3px'}}>
          <Text style={{fontWeight: 'bold', fontSize: 'small'}}>{title}</Text>
        </View>
        <View style={{
          overflow: 'hidden',
          marginBottom: '13px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontSize: 'x-small',
          color: '#b2bec3'
        }}
        >
          {content}
        </View>
      </View>
      <View className='at-row at-row__justify--center at-row__align-content--between'
        style={{fontSize: 'small', marginBottom: '8px'}}
      >
        <View className='at-col-4 at-icon at-icon-eye' style={{}}>
          &nbsp;<Text style={{fontSize: 'x-small'}}>1.2k</Text>
        </View>
        <View className='at-col-4 at-icon at-icon-message' style={{textAlign: 'center'}}>
          &nbsp;<Text style={{fontSize: 'x-small'}}>{commentCount}</Text>
        </View>
        <View className='at-col-4 at-icon at-icon-heart' style={{textAlign: 'right'}}>
          &nbsp;<Text style={{fontSize: 'x-small'}}>{likeCount}</Text>
        </View>
      </View>
    </View>
  )
}

export default PostItem;