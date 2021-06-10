import Taro from '@tarojs/taro';
import baseURL from './index'
import { UserInfo } from '../types/common';
import { resData } from '../types/network';

interface LogRes {
  userInfo: UserInfo,
  token: string
}

//用户登录
export function login(info: { username: string; password: string }) {
  return Taro.request<resData<LogRes>>({
    method: 'POST',
    url: baseURL + '/user/login',
    data: info
  })
}

//用户注册
export function register(info: { username: string; password: string }) {
  return Taro.request<resData<LogRes>>({
    method: 'POST',
    url: baseURL + '/user/register',
    data: info
  })
}
//获取指定 Uid 的用户 信息
export function getByUid(Uid: number) {
  return Taro.request<resData<UserInfo>>({
    url: baseURL + '/user/getByUid',
    data: {
      Uid
    }
  })
}
