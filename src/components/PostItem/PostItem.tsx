import React, {useState} from "react";
import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {AtAvatar, AtTag} from "taro-ui";
import moment from "moment";
import {handleProfile} from "../../utils";

interface PostItemProps {
  id:string,
  title: string,
  content: string,
  date: string,
  author: {
    userId:string,
    username: string,
    headerUrl:string,
    school: string,
    major: string
  },
  likeCount: number,
  commentCount: number,
  index?: number
}

const PostItem: React.FC<PostItemProps> = ({id,title,
                                             author,
                                             date,
                                             content,
                                             likeCount,
                                             commentCount,index}) => {

  const {userId,username, school, major,headerUrl} = author;
  const [likeStatus,setLikeStatus] = useState('at-icon-heart');

  const handleLike=()=>{
    if(likeStatus==='at-icon-heart') setLikeStatus('at-icon-heart-2')
    else setLikeStatus('at-icon-heart')
  }

  const showRanking=()=>{
    let color;
    if(index!==undefined) {
      switch (index){
        case 0:
          color='#ff7675'
          break;
        case 1:
          color='#fdcb6e'
          break
        case 2:
          color='#74b9ff'
          break
        default:
          color='#b2bec3'
      }
      return (
        <View className='at-col-1'>
          <AtTag type='secondary' circle size='small'>
            <Text style={{color:color,fontWeight:'bolder',fontSize:'large'}}>{index+1}</Text>
          </AtTag>
        </View>
      )
    }else return (
      <View className='at-col-1' />
    )
  }

  const handleDetail = () => {
    Taro.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }



  return (
    <View className='' style={{margin: '10px 0', borderBottom: '1px solid #dfe6e9'}}>
      {/*帖子作者信息*/}
      <View className='at-row at-row__justify--center' style={{marginBottom: '5px'}} onClick={()=>handleProfile(userId)}>
        <View className='at-col-2'>
          <AtAvatar circle image={headerUrl} size='small' />
        </View>
        <View className='at-col-9' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View
            style={{fontWeight: 'bold', fontSize: 'x-small', marginBottom: '5px'}}
          >{username}</View>
          <View style={{fontSize: '10px', color: '#b2bec3'}}>{school + ' ' + major +' '+moment(date).format("YYYY-MM-DD")}</View>
        </View>
        {
          showRanking()
        }
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
        style={{fontSize: 'small', marginBottom: '8px',color:'#2d3436'}}
      >
        <View className='at-col-4 at-icon at-icon-eye' style={{}}>
          &nbsp;<Text style={{fontSize: 'x-small'}}>1.2k</Text>
        </View>
        <View className='at-col-4 at-icon at-icon-message' style={{textAlign: 'center'}}>
          &nbsp;<Text style={{fontSize: 'x-small'}}>{commentCount}</Text>
        </View>
        <View className='at-col-4' style={{display:'flex',justifyContent:'flex-end'}}>
          <View className={`at-icon ${likeStatus}`} onClick={handleLike}>
            &nbsp;<Text style={{fontSize: 'x-small'}}>{likeCount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PostItem;
