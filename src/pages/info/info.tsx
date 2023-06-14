import {View} from "@tarojs/components";
import {AtList, AtListItem} from "taro-ui";
import Taro from "@tarojs/taro";
import {useEffect, useState} from "react";
import {getCookies} from "../../utils";
import {HOST} from "../../util/constants";

interface Info{

}
const Info:React.FC<Info>=()=>{

  const [show,setShow] = useState(false)
  const [file,setFile] = useState()
  const [header,setHeader] = useState()

  useEffect(()=>{
    setHeader(Taro.getStorageSync('headerUrl'))
  })

  const handleShow=()=>{
    Taro.chooseImage({
      async success(res) {
        const tempFilePaths = res.tempFilePaths
        const response = await Taro.uploadFile({
          url: `${HOST}user/upload`, 
          filePath: tempFilePaths[0],
          header: {
            'Cookie': getCookies()
          },
          name: 'headerImage',
        })
        Taro.setStorageSync('headerUrl', JSON.parse(response.data).data);
        setHeader(Taro.getStorageSync('headerUrl'))
        Taro.showToast({
          title: '头像修改成功'
        })
      }
    })
  }

  const handleClick = ()=>{

  }

  return (
    <View className='info'>
      <AtList>
        <AtListItem title='ID：2014258' note='注册时间：2021-09-26' extraText={Taro.getStorageSync('username')} onClick={handleClick} />
        <AtListItem
          title='头像'
          arrow='right'
          thumb={Taro.getStorageSync('headerUrl')}
          extraText='上传'
          onClick={handleShow}
        />
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
