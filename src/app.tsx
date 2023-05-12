import React, {FC} from 'react';
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux';
import Taro from '@tarojs/taro'

import './app.scss';

interface MyState {
}

const reducers = combineReducers({
  thread: (state: MyState = {}, action) => {
    if (action.type === 'SET_CURRENT_THREAD') {
      return {
        ...state,
        ...action.thread,
      };
    }
    return state;
  },
});

const store = createStore(reducers);

interface Props {
  children: React.ReactNode;
}

const App: FC<Props> = ({children}) => {
  // children是将要会渲染的页面
  return <Provider store={store}> {children} </Provider>
};

/**
 * 请求拦截器，把所有的本地存储添加到cookie头字段
 */
/*Taro.addInterceptor(chain => {

  const { method, url, header, data } = chain.requestParams

/!*  const storage = Taro.getStorageInfoSync();
  const { keys } = storage;
  let combinedString = '';

  keys.forEach((key, index) => {
    const value = Taro.getStorageSync(key);
    combinedString += `${key}=${value}`;

    if (index !== keys.length - 1) {
      combinedString += ';';
    }
  });

  header['Cookie'] = combinedString*!/

  return chain.proceed({ method, url, header, data })
})*/

/*
响应拦截器
将后端所有的set-cookie字段全部手动存入小程序的本地存储
 */
Taro.addInterceptor(chain=>{

  return chain.proceed(chain.requestParams).then(res=>{
/*    const cookies = res.header['Set-Cookie']
    if (cookies) {
      // 处理多个 set-cookie 值
      const cookieArr = cookies.split(';')

      // 遍历设置到本地存储中
      cookieArr.forEach(cookie => {
        const [key, value] = cookie.split('=')
        if(key && value) Taro.setStorageSync(key.trim(), value.trim())
      })
    }*/

    const JSESSIONID= res.header['JSESSIONID']
    if(JSESSIONID){
      const [key, value] = JSESSIONID.split('=')
      if(key && value) Taro.setStorageSync(key.trim(), value.trim())
    }
    return res;
  })
})

export default App;
