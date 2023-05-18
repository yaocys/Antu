import React, {useState} from 'react';
import {View, Text, Image} from '@tarojs/components';
import {AtSearchBar, AtTag} from "taro-ui";
import Taro from "@tarojs/taro";
import './search.scss';

const Search: React.FC = () => {

  const [historyList, setHistoryList] = useState(['互联网','备考']);

  const [keyword,setKeyword] = useState('')

  const hotList = [
    { searchWord: '数学',iconUrl:"http://p4.music.126.net/P4mXkx6VKXLFqVo5ohHxDg==/109951163992439900.jpg"},
    { searchWord: '英语' },
    { searchWord: '政治' },
    { searchWord: '专业课',iconUrl:"http://p4.music.126.net/P4mXkx6VKXLFqVo5ohHxDg==/109951163992439900.jpg" },
    { searchWord: '复试' },
    { searchWord: '真题' },
    { searchWord: '计划' ,iconUrl:"http://p4.music.126.net/P4mXkx6VKXLFqVo5ohHxDg==/109951163992439900.jpg"},
    { searchWord: '调剂' },
    { searchWord: '报名' },
    { searchWord: '经验' },
    { searchWord: '笔记' },
    { searchWord: '复习资料' },
    { searchWord: '院校排名' },
    { searchWord: '招生信息',iconUrl:"http://p4.music.126.net/P4mXkx6VKXLFqVo5ohHxDg==/109951163992439900.jpg" },
    { searchWord: '借贷' },
    { searchWord: '兼职' },
    { searchWord: '奖学金' },
    { searchWord: '留学' },
    { searchWord: '调剂信息' },
    { searchWord: '就业' },
  ];

  const searchHistory = (historyWord: string) => {
    Taro.navigateTo({
      url: `/pages/result/result?keyword=${historyWord}`
    })
  };

  const handleDelete = () => {
    historyList.length=0
  };

  const searchHotSong = (hotWords: string) => {
    // Handle search hot song
  };

  const handleSearch = ()=>{
    historyList.push(keyword)
    Taro.navigateTo({
      url: `/pages/result/result?keyword=${keyword}`
    })
    setKeyword('')
  }

  const saveKeyword = (value)=>{
    setKeyword(value)
  }

  return (
    <>
      <AtSearchBar
        value={keyword}
        onChange={saveKeyword}
        onActionClick={handleSearch}
        focus
      />
      <View className='searchContainer'>
        {historyList.length ? (
          <View className='history'>
            <View style={{marginRight:'15px'}}>历史</View>
            {historyList.map((item: string,index) =>(
              <View key={index}  style={{marginRight:'5px'}}>
                <AtTag circle onClick={()=>searchHistory(item)}>{item}</AtTag>
              </View>
            ))}
            <View className='at-icon at-icon-trash' onClick={handleDelete} />
          </View>
        ) : null}

        {/* 热搜榜 */}
        <View className='hotContainer'>
          <View className='title'>热搜榜</View>
          {/* 列表 */}
          <View className='hotList'>
            {hotList.map((item: any, index: number) => (
              <View className='hotItem' key={item.searchWord}>
                <Text className='order'>{index + 1}</Text>
                <Text
                  onClick={() => searchHotSong(item.searchWord)}
                  data-hotwords={item.searchWord}
                >
                  {item.searchWord}
                </Text>
                {item.iconUrl && (
                  <Image src={item.iconUrl} className='iconImg' />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default Search;
