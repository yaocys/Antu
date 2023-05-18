import * as Timeago from 'timeago.js'
import Taro from "@tarojs/taro";

// 数字/英文与中文之间需要加空格
const betterChineseDict = (_, index) => {
  return [
    ['刚刚', '片刻后'],
    ['%s 秒前', '%s 秒后'],
    ['1 分钟前', '1 分钟后'],
    ['%s 分钟前', '%s 分钟后'],
    ['1 小时前', '1小 时后'],
    ['%s 小时前', '%s 小时后'],
    ['1 天前', '1 天后'],
    ['%s 天前', '%s 天后'],
    ['1 周前', '1 周后'],
    ['%s 周前', '%s 周后'],
    ['1 个月前', '1 个月后'],
    ['%s 个月前', '%s 个月后'],
    ['1 年前', '1 年后'],
    ['%s 年前', '%s 年后']
  ][index]
}

// @ts-ignore
Timeago.register('zh', betterChineseDict)
export default Timeago; // 导出 Timeago 实例

export const getCookies = ()=>{
  let res = '';
  const JSESSIONID = Taro.getStorageSync('JSESSIONID');
  const ticket = Taro.getStorageSync('ticket');
  if(JSESSIONID) res = res +'JSESSIONID='+JSESSIONID;
  if(ticket) res = res+ticket+';';
  return res;
}
