import {Text, View} from '@tarojs/components'
import {AtAvatar, AtButton, AtNavBar} from "taro-ui";
import Taro from "@tarojs/taro";

import './index.scss'
import BottomBarInputBox from "../../components/Bottom_bar_input_box/BottomBarInputBox";

/**
 * 将HTML字符串中的特定标签添加class属性
 */
function prettyHTML(str: string) {
  const lines = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  lines.forEach((line) => {
    const regex = new RegExp(`<${line}`, 'gi');

    str = str.replace(regex, `<${line} class="line"`);
  });

  return str.replace(/<img/gi, '<img class="img"');
}

const Detail = () => {

  return (
    <>
      <View style={{backgroundColor: '#dfe6e9', marginBottom:'85px',letterSpacing:'1px'}}>
        {/*内容栏*/}
        <View style={{backgroundColor: 'white', padding: '12px 15px', marginBottom: '3px'}}>
          {/*作者信息*/}
          <View className='at-row at-row__justify--center'>
            <View className='at-col-2'>
              <AtAvatar circle image='https://jdc.jd.com/img/200' />
            </View>
            <View className='at-col-7' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <View style={{fontWeight: 'bolder', fontSize: '13px', marginBottom: '3px'}}>岸途21421435324号</View>
              <View style={{fontSize: '10px', color: '#b2bec3'}}>上海财经大学 计算机类</View>
            </View>
            <View className='at-col-3 at-col__align--center at-row'>
              <AtButton type='primary' size='small' circle className='at-col-8'
                style={{fontSize: 'x-small'}}
              >关注</AtButton>
            </View>
          </View>
          <View style={{fontSize: '20px', fontWeight: 'bold', margin: '5px 0'}}>去向推荐</View>
          <View style={{whiteSpace: 'pre-wrap', marginBottom: '5px'}}>个人背景：
            双非二本，软件工程专业，找的Java后端岗位
          </View>
          <View style={{fontSize: '10px', color: '#b2bec3'}}>2023-4-22 14:52</View>
        </View>

        {/*评论区*/}
        <View style={{backgroundColor: 'white', padding: '12px 10px'}}>
          <View style={{fontWeight: 'bolder', fontSize: 'medium', marginBottom: '15px'}}>
            全部评论<Text style={{fontSize: '10px', color: '#b2bec3'}}>（18条）</Text>
          </View>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
            </View>
          </View>
        <BottomBarInputBox />
      </>
  );
};

const Comment =()=>{
  return (
    <View style={{marginBottom:'15px'}}>
      <View className='at-row at-row__justify--center' style={{marginBottom:'5px'}}>
        <View className='at-col-2'>
          <AtAvatar circle image='https://jdc.jd.com/img/200' size='small' />
        </View>
        <View className='at-col-10' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View
            style={{fontWeight: 'bolder', fontSize: '13px', marginBottom: '3px'}}
          >再无实习就准备直接摆了</View>
          <View style={{fontSize: '10px', color: '#b2bec3'}}>上海财经大学 计算机类</View>
        </View>
      </View>
      <View className='at-row'>
        <View className='at-col-2' />
        <View className='at-col-10'>
          <View style={{fontSize:'small'}}>大佬带带我，我也是双非</View>
          <View style={{margin: '10px 0'}} className='at-row at-row__justify--center'>
            <View style={{fontSize: '10px', color: '#b2bec3'}} className='at-col-8'>2023-4-22 14:52</View>
            <View className='at-col-2 at-icon at-icon-message' style={{fontSize:'x-small'}}>&nbsp;1</View>
            <View className='at-col-2 at-icon at-icon-heart' style={{fontSize:'x-small'}}>&nbsp;21</View>
          </View>
          <View style={{backgroundColor: '#dfe6e9', padding: '8px 8px', fontSize: 'x-small'}}>
            <Text style={{fontWeight: 'bolder', fontStyle: 'italic'}}>张三</Text> 回复 <Text
            style={{fontWeight: 'bolder', fontStyle: 'italic'}}
          >李四</Text>：
            <Text>二本能拿这么多不错的Offer真厉害</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Detail;
