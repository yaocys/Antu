import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import {AtButton, AtList, AtListItem} from "taro-ui";
import './index.scss'
import {getCookies} from "../../utils";

interface Props{

}

const Setting:React.FC<Props>=()=>{
  useLoad(() => {

  })

  const handleClick = ()=>{

  }

  const logout=()=>{
    Taro.request({
      url:'http://localhost:8079/community/logout',
      header:{
        'Cookie': getCookies()
      }
    })
    Taro.clearStorage();
    Taro.switchTab({
      url:'/pages/user/user'
    })
  }

  return (
    <View className='setting' style={{backgroundColor:'#dfe6e9'}}>
      <View style={{backgroundColor:'white',marginBottom:'8px'}}>
        <AtList>
          <AtListItem title='个人资料' arrow='right' onClick={()=>Taro.navigateTo({url:'/pages/info/info'})} />
          <AtListItem title='账号与安全' arrow='right' onClick={handleClick} />
        </AtList>
      </View>
      <View style={{backgroundColor:'white',marginBottom:'8px'}}>
        <AtList>
          <AtListItem title='界面与交互' arrow='right' onClick={handleClick} />
          <AtListItem title='语音播报' arrow='right' onClick={handleClick} />
          <AtListItem title='清除缓存' arrow='right' onClick={handleClick} />
        </AtList>
      </View>
      <View style={{backgroundColor:'white',marginBottom:'8px'}}>
        <AtList>
          <AtListItem title='隐私中心' arrow='right' onClick={handleClick} />
          <AtListItem title='高级设置' arrow='right' onClick={handleClick} />
        </AtList>
      </View>
      <View style={{paddingTop:'10px',backgroundColor:'white'}}>
        <AtButton type='secondary' full onClick={logout}>退出登录</AtButton>
      </View>
    </View>
  )
}
export default Setting;
