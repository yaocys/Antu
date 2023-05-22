import {AtButton, AtCalendar} from "taro-ui";
import {View} from "@tarojs/components";

interface Props{

}
const CheckIn:React.FC<Props>=()=>{

  const getCalender = ()=>{

  }
  return (
    <>
      <AtCalendar />
      <View style={{padding: '20px 10px'}}>
        <AtButton type='primary' circle>点击签到</AtButton>
      </View>
    </>
  )
}

export default CheckIn
