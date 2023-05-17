import {Text, View} from "@tarojs/components";
import {AtAvatar, AtButton, AtSegmentedControl, AtTag} from "taro-ui";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import FolloweeCard from "../../components/FolloweeCard/FolloweeCard";

interface Props{

}

const Publish:React.FC<Props>=()=>{

  const [current,setCurrent] = useState<number>(2);
  const handleSwitch = (value)=>{
    setCurrent(value)
  }

  return (
    <View style={{backgroundColor:'#dfe6e9'}}>
      <View className='at-row at-row__justify--center'
        style={{backgroundColor:'white',paddingBottom:'15px'}}
      >
        <View className='at-col-3'>
          <AtAvatar circle image={Taro.getStorageSync('headerUrl')} size='large' />
        </View>
        <View className='at-col-5' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',lineHeight:1.5}}>
          <View style={{fontWeight: 'bolder', fontSize: 'large'}}>{Taro.getStorageSync('username')}</View>
          <View style={{fontSize: 'small', color: '#b2bec3'}}>上海财经大学 计算机类</View>
        </View>
        <View className='at-col-3 at-col__align--center'>
          <AtButton type='primary' size='small' circle style={{fontSize: 'x-small'}}>
            关注
          </AtButton>
        </View>
      </View>
      <View style={{padding:'0 20px',backgroundColor:'white',marginBottom:'3px'}}>
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
            <Text>ID:3432874</Text>
          </View>
          <View  style={{marginTop:'10px',paddingBottom:'5px'}}>
            <Text>注册时间：2010-9-25</Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor:'white',padding:'10px'}}>
        <AtSegmentedControl
          values={['帖子', '评论', '关注','粉丝']}
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
            <FolloweeCard />
            <FolloweeCard />
            </View>
            : null
        }
        {
          current === 3
            ? <View className='tab-content'>
            <FollowerCard />
              <FollowerCard />
              <FollowerCard />
            </View>
            : null
        }
      </View>
    </View>
  )
}

export default Publish;
