import {View} from "@tarojs/components";
import {AtList, AtListItem} from "taro-ui";

interface Info{

}
const Info:React.FC<Info>=()=>{

  const handleClick = ()=>{

  }

  return (
    <View className='info'>
      <AtList>
        <AtListItem title='ID：2014258' extraText='注册时间：2021-09-26' onClick={handleClick} />
        <AtListItem title='头像' arrow='right' onClick={handleClick} />
        <AtListItem title='昵称' extraText='捞捞孩子吧' arrow='right' onClick={handleClick} />
        <AtListItem title='性别' extraText='男' arrow='right' onClick={handleClick} />
        <AtListItem title='出生日期' extraText='2000-06-29' arrow='right' onClick={handleClick} />
        <AtListItem title='QQ号码' extraText='未填写' arrow='right' onClick={handleClick} />
        <AtListItem title='支付宝' extraText='未填写' arrow='right' onClick={handleClick} />
        <AtListItem title='收货地址' extraText='未填写' arrow='right' onClick={handleClick} />
      </AtList>
    </View>
  )
}

export default Info;
