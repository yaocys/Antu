export default defineAppConfig({
  // 哪个路径放在最前面，打开小程序时就先加载哪个
  pages: [
    'pages/user/user',
    'pages/index/index',
    'pages/notice/notice',
    'pages/detail/detail',
    'pages/login/login',
  ],
  tabBar: {
    list: [
      {
        iconPath: 'resource/antu.png',
        selectedIconPath: 'resource/antu_selected.png',
        pagePath: 'pages/index/index',
        text: '岸途'
      },
      {
        iconPath: 'resource/notice.png',
        selectedIconPath: 'resource/notice_selected.png',
        pagePath: 'pages/notice/notice',
        text: '消息'
      },
      {
        iconPath: 'resource/user.png',
        selectedIconPath: 'resource/user_selected.png',
        pagePath: 'pages/user/user',
        text: '我'
      }
    ],
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Antu',
    navigationBarTextStyle: 'black'
  }
})
