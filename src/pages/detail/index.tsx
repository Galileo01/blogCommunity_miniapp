import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtMessage, AtTag, AtTabBar } from 'taro-ui';
import marked from 'marked';
import highlight from 'highlight.js';
import filterXSS from 'xss';
import 'highlight.js/styles/github.css'; //
import { postItem } from '../../types/common';
import { getPostByPid, increReadCount, increStarCount } from '../../network/post';
import PostComment from './CommentWapper';
import 'taro-ui/dist/style/components/tag.scss'; // 按需引入
import 'taro-ui/dist/style/components/tab-bar.scss';
import 'taro-ui/dist/style/components/badge.scss';
import 'taro-ui/dist/style/components/message.scss';
import 'taro-ui/dist/style/components/icon.scss';
import './index.less';
interface ToastInfo {
  text: string;
  isShow: boolean;
  status: 'error' | 'loading' | 'success';
}
export default function Detail() {
  const router = useRouter();
  const Pid = parseInt(router.params.Pid, 10);
  const [postData, setPost] = useState<postItem | null>(null);
  console.log(router.params);
  //marked配置
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer,
    // gfm:true,//github 风格
    pedantic: false, //容错 并尝试修正
    sanitize: false, //忽略html
    breaks: false, //github 换行符
    smartLists: true, //列表渲染
    highlight: code => {
      //添加 hljs 的类名  使用 主题样式
      return `<div class="hljs"> 
            ${highlight.highlightAuto(code).value}
            </div>`;
    },
  });
  //获取帖子数据
  async function getData() {
    const { data } = await getPostByPid(Pid);
    if (data.success === 0) {
      Taro.atMessage({
        message: '网络请求失败',
        type: 'error',
      });
    } else {
      console.log(data.data);

      setPost(data.data);
    }
  }
  //点赞
  async function submitStar() {
    const { data } = await increStarCount(Pid);
    if (data.success === 0) {
      Taro.atMessage({
        message: '点赞失败',
        type: 'error',
      });
    } else {
      Taro.atMessage({
        message: '点赞成功',
        type: 'success',
      });
      setPost({
        ...postData,
        starCount: postData.starCount + 1,
      });
    }
  }
  //滚动到 评论
  function scrollToComment() {
    Taro.pageScrollTo({
      selector: '.post-comment',
    });
  }
  //一渲染 就获取数据
  useEffect(() => {
    getData();
  }, []);
  // 持续 10s之后发送 阅读次数递增 请求
  useEffect(() => {
    let timer = setTimeout(async () => {
      const { data } = await increReadCount(Pid);
      if (data.success === 0) {
        Taro.atMessage({
          message: '阅读次数增加失败',
          type: 'error',
        });
        console.log(data.data);
      }
      clearTimeout(timer);
    }, 5000);
    //组件卸载时  取消定时器
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <View className="detail">
      {postData && (
        <View className="post">
          <View className="post_title small">{postData.title}</View>
          <View className="username small">
            用户:
            <Text
              className="text"
              onClick={() => {
                console.log(postData.Uid);

                Taro.navigateTo({
                  url: '/pages/profile/index?Uid=' + postData.Uid,
                });
              }}>
              {postData.username}
            </Text>
          </View>
          <View className="other-info">
            <View className="small update-time">更新时间 :{postData.updateTime}</View>
          </View>
          <View className="content">
            <View
              dangerouslySetInnerHTML={{
                __html: marked(filterXSS(postData.content)),
              }}></View>
          </View>
          <PostComment Pid={Pid} />
        </View>
      )}

      <AtTabBar
        iconSize={18}
        fontSize={12}
        tabList={[
          { title: '评论', text: postData?.commentCount, iconType: 'message' },
          { title: '点赞', iconType: 'heart', text: postData?.starCount },
          { title: '阅读', iconType: 'eye', text: postData?.readCount },
        ]}
        onClick={index => {
          //点赞处理
          if (index === 1) {
            submitStar();
          }
          //点击 评论
          else if (index === 0) {
            scrollToComment();
          }
        }}
        current={1}
        fixed
      />
      <AtMessage />
    </View>
  );
}
