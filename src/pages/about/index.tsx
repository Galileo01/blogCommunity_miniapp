import React, { useState } from 'react';
import { View, Image } from '@tarojs/components';
import { AtRate } from 'taro-ui';
import 'taro-ui/dist/style/components/rate.scss';
import 'taro-ui/dist/style/components/icon.scss';
import './index.less';
export default function About() {
  const [star, setStar] = useState(0);
  return (
    <View className="about">
      <View className="bg"></View>
      <View className="content">
        <Image src={require('../../static/favicon.png')} />
        <View>BlogCommunity 博客社区</View>
        <View>V 0.0.1</View>
        <AtRate value={star} onChange={value => setStar(value as any)} />
      </View>
    </View>
  );
}
