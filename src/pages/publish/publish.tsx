import {Picker, Text, View} from "@tarojs/components";
import {AtButton, AtForm, AtIndexes, AtInput, AtList, AtListItem, AtTextarea} from "taro-ui";
import {useState} from "react";
import Taro from "@tarojs/taro";
import {getCookies} from "../../utils";

interface Props{

}

const Publish:React.FC<Props>=()=>{

  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [classify,setClassify] = useState('交流互助')
  const selector = ['经验分享','选校选择','交流互助','政策解读','资料发布']

  /**
   * 保存表达数据，柯里化
   */
  const saveData = (type:string)=>{
    return (value:string)=>{
      switch (type){
        case 'title':
          setTitle(value)
          return value;
        case 'content':
          setContent(value)
          return value;
      }
    }
  }

  const saveClassify = (event)=>{
    setClassify(selector[event.detail.value])
  }

  const handleSubmit = ()=>{
    // TODO 分类参数暂时没用
    Taro.request({
      url: 'http://localhost:8079/community/post/add',
      method:'POST',
      data:{
        title: title,
        content: content
      },
      header:{
        "Content-Type": 'application/x-www-form-urlencoded',
        'Cookie': getCookies()
      }
    }).then((response)=>{
      const code = response.data.code;
      if(code===400||code===500){
        Taro.showToast({
          title: response.data.msg
        })
      }else if(code===200){
        handleRest()
        Taro.switchTab({
          url: '/pages/index/index'
        })
        Taro.showToast({
          title: '发帖成功'
        })
      }
    })
  }

  const handleRest = ()=>{
    setTitle('')
    setContent('')
    setClassify('交流互助')
  }

  return (
    <View>
      <AtForm onSubmit={handleSubmit} onReset={handleRest}>
        <View style={{marginBottom:'20px'}}>
          <AtInput name='title' onChange={saveData('title')} type='text'
            placeholder='请输入帖子标题（20字内）' value={title} maxLength={20}
          />
          <AtTextarea
            value={content}
            onChange={saveData('content')}
            maxLength={1000}
            placeholder='此刻你想和大家分享什么？'
            height='600'
          />
        </View>

        <View style={{marginBottom:'20px'}}>
          <Picker mode='selector' range={selector} onChange={saveClassify}>
            <AtList>
              <AtListItem
                title='帖子分类'
                extraText={classify}
              />
            </AtList>
          </Picker>
        </View>
        <View style={{padding: '0 10px'}}>
          <AtButton type='secondary' size='normal' formType='submit'>发布</AtButton>
        </View>
      </AtForm>
    </View>
  )
}

export default Publish;
