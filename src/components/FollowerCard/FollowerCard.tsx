import {AtButton, AtCard} from "taro-ui";
import {Text, View} from "@tarojs/components";

interface Props{

}

const FollowerCard:React.FC<Props> = ()=>{
  return (
    <View style={{marginTop:'10px'}}>
      <AtCard
        extra='关注了你'
        title='捞捞张同学吧'
        thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
      >
        <View className='at-row at-row__justify--between'>
          <Text style={{display:'flex',alignItems:'center'}}>时间：2022-7-14 23:08</Text>
          <View style={{all:"unset"}} className='at-col-3'>
            <AtButton type='primary' size='small'>关注Ta</AtButton>
          </View>
        </View>

      </AtCard>
    </View>
  )
}

export default FollowerCard;
