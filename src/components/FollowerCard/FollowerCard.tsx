import {AtButton, AtCard} from "taro-ui";
import {Text, View} from "@tarojs/components";
import moment from "moment/moment";

interface Props{
  id:string,
  username:string,
  headerUrl:string,
  followTime:string,
  hasFollowed:boolean
}

const FollowerCard:React.FC<Props> = ({username,headerUrl,followTime})=>{
  // TODO 关注还没有做
  return (
    <View style={{marginTop:'10px'}}>
      <AtCard
        extra='关注了你'
        title={username}
        thumb={headerUrl}
      >
        <View className='at-row at-row__justify--between'>
          <Text style={{display:'flex',alignItems:'center'}}>
            时间：{moment(followTime).format("YYYY-MM-DD HH:mm")}
          </Text>
          <View style={{all:"unset"}} className='at-col-3'>
            <AtButton type='primary' size='small'>关注Ta</AtButton>
          </View>
        </View>

      </AtCard>
    </View>
  )
}

export default FollowerCard;
