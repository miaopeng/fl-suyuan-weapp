/* eslint-disable no-console */

const SERVERS = {
  PROD: "https://zt.fulldao.cn",
  DEV:  "http://flian.iask.in",
  MOCK: "http://localhost:3000",
  TING: "http://192.168.12.119:10002",
};
const APP_SESSION_KEY = 'app_session_key';

App({
  API_URL: SERVERS.PROD,
  STATIC_HOST: SERVERS.PROD,

  user: {
  },

  product: {
  },

  isLoggedIn() {
    // 根据本地存储数据判断用户是否登录
    return !!this.user.app_session_key
  },

  setUserSession(data) {
    if (!data) return;
    wx.setStorageSync(APP_SESSION_KEY, data);
    this.user.app_session_key = data;
  },

  clearUserSession() {
    wx.removeStorageSync(APP_SESSION_KEY);
    this.user.app_session_key = null;
  },

  getToken() {
    return wx.getStorageSync(APP_SESSION_KEY);
  },

  saveUserInfo(userInfo) {
    this.user = {
      ...this.user,
      userInfo,
    }
  },

  saveProfile(profile) {
    this.user = {
      ...this.user,
      ...profile,
    };
  },

  saveProduct(product) {
    const pics = product.productSrc.map(pic => this.STATIC_HOST + pic);
    this.product = {
      ...this.product,
      ...product,
      pics,
    }
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
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: user => {
              this.saveUserInfo(user.userInfo);
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

  toast(opt) {
    const { title = '', icon = 'none', duration = 2000 } = opt;
    wx.showToast({
      title: typeof opt === 'string' ? opt : title,
      icon,
      duration,
    });
  }
})