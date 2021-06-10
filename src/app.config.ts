export default {
  pages: [
    'pages/index/index',
    'pages/about/index',
    'pages/setting/index',
    'pages/profile/index',
    'pages/detail/index',
    'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    selectedColor: '#1890ff',
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: 'static/home.png',
        selectedIconPath: 'static/home-active.png'
      },
      {
        text: "设置",
        pagePath: "pages/setting/index",
        iconPath: 'static/setting.png',
        selectedIconPath: 'static/setting-active.png'
      }
    ]
  }
}
