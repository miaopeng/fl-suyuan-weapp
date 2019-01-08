const SERVERS = {
  PROD: "http://flian.iask.in",
  DEV:  "https://zt.fulldao.cn/test",
  MOCK: "http://localhost:3000",
  MIN_MIN: "http://192.168.12.69:8080",
  ZHI_HAO: "http://192.168.12.67:8080"
};
const APP_SESSION_KEY = 'app_session_key';

App({
  API_URL: SERVERS.PROD,

  user: {
  },

  isLoggedIn() {
    // 根据本地存储数据判断用户是否登录
    return !!this.user.app_session_key
  },

  setUserSession(data) {
    if (!data) return;
    wx.setStorage({
      key: APP_SESSION_KEY,
      data
    });
    this.user.app_session_key = data;
  },

  clearUserSession() {
    wx.removeStorageSync(APP_SESSION_KEY);
    this.user.app_session_key = null;
  },

  getToken() {
    return wx.getStorageSync(APP_SESSION_KEY);
  },

  saveProfile(profile) {
    this.user = {
      ...this.user,
      ...profile
    };
  },

  onLaunch () {
    console.log('app.user', this.user);
    console.log(`User is ${!this.isLoggedIn() && 'not '}logged in.`);
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        console.log('wx.login success', res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('wx.getSetting success');
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: user => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = user.userInfo
              console.log('userInfo', user.userInfo);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(user)
              }
            }
          })
        } else {
          console.log('no authSetting for scope.userInfo');
        }
      },
      fail: res => {
        console.log('fail', res);
      }
    });
  },
  globalData: {
    userInfo: null
  },

  toast(opt) {
    const { title = '', icon = 'none', duration = 2000 } = opt;
    wx.showToast({
      title: typeof opt === 'string' ? opt : title,
      icon,
      duration,
    });
  }
})