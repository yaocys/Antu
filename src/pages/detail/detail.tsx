import {Form, Input, Text, View} from '@tarojs/components'
import {
  AtActivityIndicator,
  AtAvatar,
  AtBadge,
  AtButton,
  AtDivider,
  AtFloatLayout,
  AtTextarea
} from "taro-ui";
import React, {useEffect, useState} from "react";
import Taro, {useReachBottom} from "@tarojs/taro";
import moment from "moment";
import {getCookies} from "../../utils";

import './index.scss'
import {HOST} from "../../util/constants";


interface Props{

}

interface Post{
  id:number,
  title:string,
  content:string,
  createTime:string,
  commentCount:number,
  likeCount:number,
  likeStatus:boolean
}

interface Author{
  id:number,
  username:string,
  headerUrl:string
}

interface CommentListItem{
  commentId:number
  userId:number
  entityType:number
  entityId:number
  targetId:number
  content:string
  status: number
  createTime: string
  username:string
  headerUrl: string
  likeStatus: boolean
  likeCount:number
  replyCount:number
  replies: {
    replyId:number
    userId:number
    entityType:number
    entityId:number
    targetId:number
    content:string
    status: number
    createTime: string
    username:string
    headerUrl: string
    likeStatus: boolean
    likeCount:number
    target: Author
  }[]
}

const Detail:React.FC<Props>= () => {

  const [postId,setPostId] = useState('');
  const [postDetail,setPostDetail] = useState<Post>({} as Post);
  const [author,setAuthor] = useState<Author>({} as Author);
  const [loading, setLoading] = useState(false);// 加载状态
  const [pageNum, setPageNum] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [commentList,setCommentList] = useState<CommentListItem[]>([]);

  /**
   * 加载评论
   */
  const getComment = async (offset:number,id:string)=>{
    if (!hasNextPage || loading) return;
    setLoading(true);
    await Taro.request({
      url: `${HOST}comment/query/${id}`,
      data: {
        offset: offset + 1,
        limit: 5
      },
      header:{
        'Cookie': getCookies()
      },
      success:(response)=>{
        setPageNum(response.data.data.pageNum)
        setHasNextPage(response.data.data.hasNextPage)
        const transformedList = response.data.data.list.map((item:any):CommentListItem=>{
          return {
            commentId: item.comment.id,
            userId: item.comment.userId,
            entityType: item.comment.entityType,
            entityId: item.comment.entityId,
            targetId: item.comment.targetId,
            content: item.comment.content,
            status: item.comment.status,
            createTime: item.comment.createTime,
            username: item.user.username,
            headerUrl: item.user.headerUrl,
            likeStatus: item.likeStatus,
            likeCount: item.likeCount,
            replyCount: item.replyCount,
            replies: item.replies.map((replyItem:any)=> {
              return {
                replyId: replyItem.reply.id,
                userId: replyItem.reply.userId,
                entityType: replyItem.reply.entityType,
                entityId: replyItem.reply.entityId,
                targetId: replyItem.reply.targetId,
                content: replyItem.reply.content,
                status: replyItem.reply.status,
                createTime: replyItem.reply.createTime,
                username: replyItem.user.username,
                headerUrl: replyItem.user.headerUrl,
                likeStatus: replyItem.likeStatus,
                likeCount: replyItem.likeCount,
                target: {
                  id: replyItem.target?.id,
                  username: replyItem.target?.username,
                  headerUrl: replyItem.target?.headerUrl,
                }
              }
            })
          }
        })
        setCommentList(commentList.concat(transformedList))
      },
      complete:()=>{
        setLoading(false)
      }
    })
  }

  useEffect(()=>{
    const { id } = Taro.getCurrentInstance().router?.params as any;
    setPostId(id);
    Taro.request({
      url: `${HOST}post/detail/${id}`,
      header:{
        'Cookie': getCookies()
      },
      success:(response)=>{
        setPostDetail({
          id: response.data.data.post.id,
          title: response.data.data.post.title,
          content: response.data.data.post.content,
          createTime:response.data.data.post.createTime,
          commentCount:response.data.data.post.commentCount,
          likeCount:response.data.data.likeCount,
          likeStatus:response.data.data.likeStatus
        });
        setAuthor({
          id:response.data.data.user.id,
          username:response.data.data.user.username,
          headerUrl:response.data.data.user.headerUrl
        })
      }
    })
    getComment(pageNum,id)
  },[])

  useReachBottom(() => {
    getComment(pageNum,postId);
  })

  const [showEdit,setShowEdit] = useState(false);
  const [editInput,setEditInput] = useState('');
  const [prompt,setPrompt] = useState('');
  const [type,setType] = useState(0);
  const [entityId,setEntityId]= useState('');
  const [targetId,setTargetId] = useState('');

  const handleEdit=(text:string,t:number,id:string,tar?:string)=>{
    if (Taro.getStorageSync('ticket')){
      setPrompt(text)
      setType(t)
      setEntityId(id)
      if(tar)setTargetId(tar)
      setShowEdit(true)
    }else{
      Taro.showToast({
        title: '用户未登录'
      })
    }
  }

  const handleClose=()=>{
    setShowEdit(false)
  }

  const saveEditInput = (value)=>{
    setEditInput(value)
    return value;
  }

  const commentOrReply = async ()=>{
    if(Taro.getStorageSync('ticket')){
      await Taro.request({
        url: `${HOST}comment/add/${postId}`,
        method:'POST',
        data:{
          userId: Taro.getStorageSync('userId'),
          entityType: type,
          entityId: entityId,
          content: editInput,
          targetId: targetId
        },
        header:{
          'Cookie': getCookies()
        },
        success:(res)=>{
          if(res.data.code===200){
            saveEditInput('')
            Taro.showToast({
              title:`${type===1?'回帖':'回复'}成功`
            })
            handleClose()// 关闭编辑框
            Taro.redirectTo({
              url: `/pages/detail/detail?id=${postId}`
            });
          }
        }
      })
    }else {
      Taro.showToast({
        title:'用户未登录'
      })
    }
  }



  return (
    <>
      <View style={{backgroundColor: '#dfe6e9', letterSpacing:'1px'}}>
        {/*内容栏*/}
        <View style={{backgroundColor: 'white', padding: '12px 15px', marginBottom: '3px'}}>
          {/*作者信息*/}
          <View className='at-row at-row__justify--center'>
            <View className='at-col-3'>
              <AtAvatar circle image={author.headerUrl} />
            </View>
            <View className='at-col-6' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{fontWeight: 'bolder', fontSize: '13px', marginBottom: '5px'}}>{author.username}</View>
              <View style={{fontSize: '10px', color: '#b2bec3'}}>上海财经大学 计算机类</View>
            </View>
            <View className='at-col-3 at-col__align--center at-row'>
              <AtButton type='primary' size='small' circle className='at-col-8'
                style={{fontSize: 'x-small'}}
              >关注</AtButton>
            </View>
          </View>
          <View style={{fontSize: '20px', fontWeight: 'bold', margin: '15px 0'}}>{postDetail.title}</View>
          <View style={{whiteSpace: 'pre-wrap', marginBottom: '15px'}}>{
            postDetail.content
          }
          </View>
          <View style={{fontSize: '10px', color: '#b2bec3'}}>
            {moment(postDetail.createTime).format("YYYY-MM-DD HH:mm")}
          </View>
        </View>

        {/*评论区*/}
        <View style={{backgroundColor: 'white', padding: '12px 10px'}}>
          <View style={{fontWeight: 'bolder', fontSize: 'medium', marginBottom: '15px'}}>
            全部评论<Text style={{fontSize: '10px', color: '#b2bec3'}}>（{postDetail.commentCount}条）</Text>
          </View>

          {
            commentList.map((comment:CommentListItem)=>{
              return (
                <Comment key={comment.commentId} comment={comment} handleEdit={handleEdit} />
                )
            })
          }
        </View>
      </View>
      <View style={{marginBottom:'90px'}}>
        {
          // 控制加载动画显示
          loading && <View style={{position: 'relative', height: '30px'}}>
            <AtActivityIndicator mode='center' isOpened content='加载中…'></AtActivityIndicator>
          </View>
        }
        {
          // 控制底线显示
          !hasNextPage && <AtDivider content='没有更多的数据了' fontSize={24} height={45} fontColor='#CCC' />
        }
      </View>
      <View style={{height:'1px'}} />

      {/*底栏*/}
      <View className='bottom_bar' style={{zIndex: 450}}>
        <View style={{margin:'10px 8px 35px 5px'}} className='at-row'>
          <View className='at-col-1 at-icon at-icon-chevron-left'
            style={{fontSize:'30px',textAlign:'left',lineHeight:'34px'}}
          />
          <View className='at-row at-row__justify--center at-col-6'>
            <View className='commentContent at-col at-col-10' onClick={()=>handleEdit('回帖',1,postId)}>
              说两句…
            </View>
          </View>
          <View  className='at-col-2 at-row__justify--center at-row'>
            <AtBadge value={postDetail.commentCount} maxValue={99}>
              <View className=' at-icon at-icon-message'
                style={{fontSize:'25px',textAlign:'center',lineHeight:'34px'}}
              />
            </AtBadge>
          </View>
          <View className={`at-col-1 at-icon ${postDetail.likeStatus?'at-icon-heart-2':'at-icon-heart'}`}
            style={{fontSize:'25px',textAlign:'right',lineHeight:'34px'}}
          />
          <View className='at-col-2 at-icon at-icon-star'
            style={{fontSize:'25px',textAlign:'center',lineHeight:'34px'}}
          />
        </View>
      </View>

      {/*底部弹框编辑器*/}
      <AtFloatLayout isOpened={showEdit} onClose={handleClose} style={{height:'10px'}}>
        <Input type='text' focus>
        </Input>
        <Form>
          <AtTextarea
            count={false}
            value={editInput}
            onChange={saveEditInput}
            maxLength={200}
            placeholder='良言一句三冬暖，恶语伤人六月寒。'
            autoFocus
            focus
          />
          <View className='at-row' style={{marginTop:'10px',letterSpacing:'1px'}}>
            <View className='at-col' style={{display: 'flex',alignItems:'center'}}>
              {prompt}
            </View>
            <AtButton type='primary' size='small' onClick={commentOrReply}>发表</AtButton>
          </View>
        </Form>
      </AtFloatLayout>
    </>
  );
};

const Comment =(props:any)=>{

  const {comment,handleEdit} = props;

  return (
    <View style={{marginBottom:'15px'}}>
      <View className='at-row at-row__justify--center' style={{marginBottom:'5px'}}>
        <View className='at-col-2'>
          <AtAvatar circle image={comment.headerUrl} size='small' />
        </View>
        <View className='at-col-10' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View
            style={{fontWeight: 'bolder', fontSize: '13px', marginBottom: '3px'}}
          >{comment.username}</View>
          <View style={{fontSize: '10px', color: '#b2bec3'}}>上海财经大学 计算机类</View>
        </View>
      </View>
      <View className='at-row'>
        <View className='at-col-2' />
        <View className='at-col-10'>
          <View style={{fontSize:'small'}}>{comment.content}</View>
          <View style={{margin: '10px 0'}} className='at-row at-row__justify--center'>
            <View style={{fontSize: '10px', color: '#b2bec3'}} className='at-col-8'>
              {moment(comment.createTime).format("YYYY-MM-DD HH:mm")}
            </View>
            <View className='at-col-2 at-icon at-icon-message' style={{fontSize:'x-small'}}
              onClick={()=>handleEdit(`回复 ${comment.username}`,2,comment.commentId)}
            >
              &nbsp;{comment.replyCount}
            </View>
            <View className='at-col-2 at-icon at-icon-heart' style={{fontSize:'x-small'}}>
              &nbsp;{comment.likeCount}
            </View>
          </View>
          {
            comment && comment.replies.map((reply)=>{
              return (
                <Reply key={reply.replyId} reply={reply} handleEdit={handleEdit} />
              )
            })
          }
        </View>
      </View>
    </View>
  )
}

const Reply = (props:any)=>{

  const {reply,handleEdit} = props;

  const hasTarget = (target:Author)=>{
    if(target!==null) return (
      <>
        &nbsp;回复&nbsp;<Text style={{fontWeight: 'bolder', fontStyle: 'italic'}}>{target.username}</Text>：
      </>
    )
  }

  return (
      <View style={{backgroundColor: '#dfe6e9', padding: '8px 0 8px 15px', fontSize: 'x-small'}}>
        <View style={{marginBottom:'3px'}}>
          <Text style={{fontWeight: 'bolder', fontStyle: 'italic'}}>{reply.username}</Text>
          {
            hasTarget(reply.target)
          }
          <Text>{reply.content}</Text>
        </View>
        <View className='at-row at-row__justify--center'>
          <View style={{fontSize: '10px', color: '#b2bec3'}} className='at-col-8'>
            {moment(reply.createTime).format("YYYY-MM-DD HH:mm")}
          </View>
          <View className='at-col-2 at-icon at-icon-message' style={{fontSize:'x-small'}}
            onClick={()=>handleEdit(`回复 ${reply.username}`,2,reply.replyId,reply.userId)}
          >
          </View>
          <View className='at-col-2 at-icon at-icon-heart' style={{fontSize:'x-small'}}>
            &nbsp;{reply.likeCount}
          </View>
        </View>
      </View>
  )
}

export default Detail;
