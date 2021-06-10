import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { AtMessage, AtInput, AtButton } from 'taro-ui';
import md5 from 'blueimp-md5';
import { login, register } from '../../network/user';
import 'taro-ui/dist/style/components/message.scss';
import 'taro-ui/dist/style/components/input.scss';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/flex.scss';
import './index.less';

export default function index() {
  const router = useRouter();
  const [oprateType, setType] = useState<'log' | 'reg'>('log');
  const [username, setName] = useState('');
  const [password, setPass] = useState('');
  //判断 message 参数 展示提示
  useEffect(() => {
    const message = Boolean(router.params.message); //取到路径 参数
    console.log(router.params, message);
    if (message) {
      Taro.atMessage({
        message: '您还未登录,请先登录',
        type: 'warning',
      });
    }
  }, []);
  async function finishHandler() {
    if (username.length === 0 || password.length === 0) {
      Taro.atMessage({
        message: '表单为空，请检查',
        type: 'warning',
      });
      return;
    }
    const requestFun = oprateType === 'log' ? login : register;
    const res = await requestFun({ password: md5(password), username });
    const { data } = res;
    //data 是string 类型 的错误信息
    if (data.success === 0) {
      Taro.atMessage({
        message: data.data,
        type: 'error',
      });
      return;
    } else {
      Taro.atMessage({
        message: oprateType === 'log' ? '登录成功' : '注册成功',
        type: 'success',
      });
      //存储
      Taro.setStorage({
        key: 'token',
        data: data.data.token,
      });
      Taro.setStorage({
        key: 'Uid',
        data: data.data.userInfo.Uid,
      });
      Taro.setStorage({
        key: 'username',
        data: data.data.userInfo.name,
      });
      Taro.navigateBack(); //回到上一级
    }
  }
  return (
    <View className="login">
      <View className="bg"></View>
      <View className="form-wapper">
        <AtInput
          name="value"
          title="用户名"
          type="text"
          placeholder="输入用户名"
          value={username}
          clear
          onChange={value => setName(value + '')}
        />
        <AtInput
          name="pass"
          title="密码"
          type="password"
          placeholder="输入密码"
          value={password}
          clear
          onChange={value => setPass(value + '')}
        />
        <View className="at-row at-row__justify--center btn">
          <View className="at-col at-col-3">
            <AtButton type="primary" size="small" onClick={finishHandler}>
              {oprateType === 'log' ? '登录' : '注册'}
            </AtButton>
          </View>
          <Text
            className="reg-text"
            onClick={() => {
              setType(oprateType === 'log' ? 'reg' : 'log');
            }}>
            {oprateType === 'log' ? '没有账号?注册' : '已有账号'}
          </Text>
        </View>
      </View>
      <AtMessage />
    </View>
  );
}
