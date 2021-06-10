import React, { useState, useEffect, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import { AtList, AtListItem, AtButton } from 'taro-ui';
import { getByUid } from '../../network/user';
import 'taro-ui/dist/style/components/list.scss';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/button.scss';
import './index.less';
export default function Profile() {
  const router = useRouter();
  const [username, setName] = useState(Taro.getStorageSync('username') || '');
  useDidShow(() => {
    const username = Taro.getStorageSync('username');
    if (username) {
      setName(username);
    }
  });
  return (
    <View className="setting">
      <View className="user-wapper">
        {username ? (
          <AtList className="user-info">
            <AtListItem title="当前用户" extraText={username} />
            <AtButton
              type="primary"
              size="small"
              onClick={() => {
                Taro.clearStorage();
                setName('');
              }}>
              注销
            </AtButton>
            <AtListItem
              title="用户信息"
              extraText="查看"
              arrow="right"
              iconInfo={{ size: 25, color: '#FF4949', value: 'user' }}
              onClick={() => {
                const Uid = Taro.getStorageSync('Uid');
                Taro.navigateTo({
                  url: '/pages/profile/index?Uid=' + Uid,
                });
              }}
            />
            <AtListItem
              title="关于"
              extraText="查看"
              arrow="right"
              iconInfo={{ size: 25, color: '#FF4949', value: 'tag' }}
              onClick={() => {
                const Uid = Taro.getStorageSync('Uid');
                Taro.navigateTo({
                  url: '/pages/about/index',
                });
              }}
            />
          </AtList>
        ) : (
          <View className="login">
            <View className="text">您还没有登录</View>
            <AtButton
              type="primary"
              size="small"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/login/index',
                });
              }}>
              去登录
            </AtButton>
          </View>
        )}
      </View>
    </View>
  );
}
