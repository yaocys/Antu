import {Picker, Text, View} from "@tarojs/components";
import {AtButton, AtForm, AtIndexes, AtInput, AtList, AtListItem, AtTextarea} from "taro-ui";
import {useEffect, useState} from "react";

interface Props{

}

const Publish:React.FC<Props>=()=>{

  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const selector = ['经验分享','选校选择','交流互助','政策解读','资料发布']

  const saveData = ()=>{

  }

  return (
    <View>
      <AtForm>
        <View style={{marginBottom:'20px'}}>
          <AtInput name='title' onChange={saveData} type='text'
                   placeholder='请输入帖子标题（20字内）' value={title} maxLength={20}
          />
          <AtTextarea
            value={content}
            onChange={saveData}
            maxLength={1000}
            placeholder='此刻你想和大家分享什么？'
            height='600'
          />
        </View>

        <View style={{marginBottom:'20px'}}>
          <Picker mode='selector' range={selector} onChange={saveData}>
            <AtList>
              <AtListItem
                title='帖子分类'
                extraText='交流互助'
              />
            </AtList>
          </Picker>
        </View>
        <View style={{padding: '0 10px'}}>
          <AtButton type='secondary' size='normal'>发布</AtButton>
        </View>
      </AtForm>
    </View>
  )
}

export default Publish;
