import React, { useState, useEffect, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { AtList, AtListItem, AtButton } from 'taro-ui';
import { UserInfo, postBaseInfo } from '../../types/common';
import PostList from '../../components/PostList';
import { getByUid } from '../../network/user';
import { getPostsByUid } from '../../network/post';
import 'taro-ui/dist/style/components/list.scss';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/button.scss';
import './index.less';
export default function Profile() {
  const router = useRouter();
  const [Uid, setUid] = useState(parseInt(router.params.Uid, 10));
  const UidS = parseInt(Taro.getStorageSync('Uid'), 10);
  const [postList, setList] = useState<postBaseInfo[]>([]);
  const [userInfo, setInfo] = useState<UserInfo>();
  //进入页面 先验证
  async function getData() {
    //先发送获取 用户信息的 请求
    const { data: data1 } = await getByUid(Uid);
    if (data1.success === 0) {
    } else {
      setInfo(data1.data);
    }
    //获取帖子列表
    const { data } = await getPostsByUid(Uid);
    console.log(data);

    if (data.success === 0) {
    } else {
      setList(data.data);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View className="profile">
      <View className="user-wapper">
        {userInfo && (
          <AtList className="user-info">
            <View className="title">用户信息</View>
            <AtListItem title="用户名" extraText={userInfo.name} />
            <AtListItem title="Tel" extraText={userInfo.tel + ''} />
            <AtListItem title="Email" extraText={userInfo.emial} />
          </AtList>
        )}
      </View>
      <View className="user-post">
        <PostList itemList={postList} headerText={Uid === UidS ? '我的帖子' : '他的帖子'} />
      </View>
    </View>
  );
}
