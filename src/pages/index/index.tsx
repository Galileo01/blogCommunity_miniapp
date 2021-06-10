import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { getCurrentInstance, useRouter } from '@tarojs/taro';
import { AtButton, AtSearchBar, AtMessage } from 'taro-ui';
import { postQuery } from './../../network/post';
import { postQueryParams } from '../../types/network';
import { postBaseInfo } from '../../types/common';
import PostList from '../../components/PostList';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/search-bar.scss';
import 'taro-ui/dist/style/components/message.scss';
import './index.less';

const Index: React.FC = () => {
  const [keyword, setWord] = useState('');
  //搜索 参数
  const init: postQueryParams = {
    type: 'all',
    keyword: '',
    offset: 0,
    limit: 15,
    mode: 'common',
  };
  async function searchPost(showMessage: boolean = true) {
    const { data } = await postQuery(params);
    console.log(params, data);

    if (data.success === 0) {
      Taro.atMessage({
        message: '网络错误',
        type: 'error',
      });
    } else {
      setList(data.data.postList);
      if (data.data.postList.length === 0 && showMessage) {
        Taro.atMessage({
          message: '数据为空，换个关键词吧',
          type: 'info',
        });
      }
    }
  }
  //进入页面请求
  useEffect(() => {
    searchPost();
  }, []);
  const [postList, setList] = useState<postBaseInfo[]>([]);
  const [params, setParams] = useState<postQueryParams>(init); //组件挂载之后 从store 恢复之前的参数
  return (
    <View className="index">
      <AtSearchBar
        value={params.keyword}
        onChange={value => setParams({ ...params, keyword: value })}
        onActionClick={() => {
          searchPost(true);
        }}
      />
      <View className="content">
        <PostList itemList={postList} headerText="所有帖子" />
      </View>
      <AtMessage />
    </View>
  );
};
export default Index;
