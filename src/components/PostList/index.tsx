import React, { useState, useEffect } from 'react';
import { AtTag, AtDivider, AtCard } from 'taro-ui';
import Taro, { useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { postBaseInfo } from '../../types/common';
import PostNumberInfo from '../PostNumberInfo';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/toast.scss';
import 'taro-ui/dist/style/components/card.scss';
import 'taro-ui/dist/style/components/tag.scss';
import 'taro-ui/dist/style/components/divider.scss';
import './index.less';
interface Props {
  itemList: postBaseInfo[];
  headerText: string;
}
const PostList: React.FC<Props> = ({ itemList, headerText }) => {
  return (
    <View className="posts_list">
      <View className="list_title">{headerText}</View>
      <View>
        {itemList.map(item => (
          <AtCard
            className="post_item"
            title={item.title}
            key={item.Pid}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/detail/index?Pid=${item.Pid}`,
              });
            }}>
            <View className="item_desc">{item.desc}</View>
            <View className="item_keywords small">
              {item.keywords.split(' ').map(item => (
                <AtTag className="word" type="primary" size="small">
                  {item}
                </AtTag>
              ))}
            </View>
            <View className="time small">更新时间:{item.updateTime}</View>
            <PostNumberInfo readCount={item.readCount} commentCount={item.commentCount} starCount={item.starCount} />
          </AtCard>
        ))}
      </View>
      <AtDivider content="没有更多了" fontColor="#2d8cf0" lineColor="#2d8cf0" className="bottom" />
    </View>
  );
};
export default PostList;
