import Taro from '@tarojs/taro';
import { postQueryParams, resData } from '../types/network';
import { postBaseInfo, postItem } from '../types/common';
import baseURL from './index'
//条件查询
export function postQuery(params: postQueryParams) {
  return Taro.request<resData<{
    postList: postBaseInfo[];
    total: number;
  }>>({
    url: baseURL + '/post/query',
    data: params
  })
}

//获取 帖子详情
export function getPostByPid(Pid: number) {
  return Taro.request<resData<postItem>>({
    url: baseURL + '/post/getByPid',
    data: { Pid }
  })
}
//递增 帖子的 阅读次数
export function increReadCount(Pid: number) {
  return Taro.request<resData<number>>({
    method: "POST",
    url: baseURL + '/post/increReadCount',
    data: {
      Pid,
    }
  });
}

//点赞
export function increStarCount(Pid: number) {
  return Taro.request<resData<number>>({
    method: "POST",
    url: baseURL + '/post/increStarCount',
    data: {
      Pid,
    }
  })
}
//获取用户
export function getPostsByUid(Uid: number) {
  return Taro.request<resData<postBaseInfo[]>>({
    url: baseURL + '/post/getByUid',
    data: {
      Uid
    }
  })
}