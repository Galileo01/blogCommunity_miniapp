import React, { memo } from 'react';
import { View, Text } from '@tarojs/components';
import 'taro-ui/dist/style/components/icon.scss';
import './index.less';
interface Props {
  readCount: number;
  starCount: number;
  commentCount: number;
}
const PostNumberInfo: React.FC<Props> = ({ readCount, commentCount, starCount }) => {
  return (
    <View className="post-number-into">
      <View className="small number-item">
        <View className="at-icon at-icon-eye" />
        <Text className="number">{readCount}</Text>
      </View>
      <View className="small number-item">
        <View className="at-icon at-icon-heart" />
        <Text className="number">{starCount}</Text>
      </View>
      <View className="small number-item">
        <View className="at-icon at-icon-message" />
        <Text className="number">{commentCount}</Text>
      </View>
    </View>
  );
};
export default memo(PostNumberInfo);
