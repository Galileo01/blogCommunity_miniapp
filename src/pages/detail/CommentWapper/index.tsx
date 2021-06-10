import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton, AtTextarea, AtActivityIndicator, AtCard } from 'taro-ui';
import filterXSS from 'xss';
import { nestedCommentItem, UserInfo } from '../../../types/common';
import { getByPid, addComment } from '../../../network/comment';
import 'taro-ui/dist/style/components/textarea.scss';
import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/activity-indicator.scss';
import 'taro-ui/dist/style/components/flex.scss';
import 'taro-ui/dist/style/components/loading.scss';
import 'taro-ui/dist/style/components/card.scss';
import './index.less';
interface Props {
  Pid: number;
}
const PostComment: React.FC<Props> = ({ Pid }) => {
  const [content, setContent] = useState('');
  const [spinning, setSpinning] = useState(true);
  const [commentList, setList] = useState<nestedCommentItem[]>([]);
  async function getComment() {
    const data = await getByPid(Pid);
    console.log(data);

    setList(data);
    setSpinning(false);
  }
  //开始渲染时  获取评论列表
  useEffect(() => {
    getComment();
  }, []);
  //提交评论
  async function submitComment() {
    //没有登录 立即跳转 登录页面
    const Uid = Taro.getStorageSync('Uid');
    if (!Uid) {
      Taro.navigateTo({
        url: '/pages/login/index?message=1',
      });
      return;
    }
    if (content.length === 0)
      return Taro.atMessage({
        message: '评论内容为空',
        type: 'warning',
      });
    const username = Taro.getStorageSync('username');
    const { data } = await addComment({
      Pid,
      replyCid: null,
      content: filterXSS(content), //过滤字符串
      username,
    });
    console.log(data.data);
    if (data.success) {
      Taro.atMessage({
        message: '评论成功',
        type: 'success',
      });
      //添加 到评论列表
      setList([{ ...data.data, children: [] }, ...commentList]);
      // 清空输入
      setContent('');
    } else {
      Taro.atMessage({
        message: '评论失败',
        type: 'error',
      });
    }
  }
  return (
    <View className="post-comment">
      <View className="make-commnet">
        <View className="title">添加评论</View>
        <AtTextarea value={content} onChange={value => setContent(value)} maxLength={200} placeholder="输入评论..." />
        <View className="at-row at-row__justify--center">
          <View className="at-col at-col-2">
            <AtButton type="primary" size="small" onClick={() => submitComment()}>
              提交
            </AtButton>
          </View>
        </View>
      </View>
      <View className="list-wapper">
        {spinning ? (
          <AtActivityIndicator mode="center" />
        ) : (
          <View className="comment-list">
            {commentList.map(item => (
              <View className="comment-item" key={item.Pid}>
                <AtCard title={item.username + ':'}>
                  <View className="comment-content">{item.content}</View>
                  <View className="time">{item.commentTime}</View>
                </AtCard>
                {/* 二级评论 */}
                {item.children.map(item2 => (
                  <AtCard title={item2.username + ':'}>
                    <View className="comment-content">{item2.content}</View>
                    <View className="time">{item2.commentTime}</View>
                  </AtCard>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
export default PostComment;
