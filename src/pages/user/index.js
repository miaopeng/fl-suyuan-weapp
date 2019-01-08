import { addRecord } from '../../service/api';
import { codeParser } from '../../utils/util';

const app = getApp()

Page({
  data: {
    user: {}
  },

  onLoad() {
    const { user } = app;
    if (user) {
      this.setData({
        user,
      });
    }
  },

  getUserInfo(e) {
    const { userInfo } = e.detail;
    if (userInfo) {
      app.saveUserInfo(userInfo);
    }
  },

  scan() {
    wx.scanCode({
      success({ result }) {
        if (result && codeParser(result)) {
          wx.showLoading({ title: '检查二维码...' });
          addRecord({ qrCodeId: codeParser(result)})
            .then(res => {
              if (res && res.data.code === 1) {
                wx.hideLoading();
                wx.navigateTo({ url: `/pages/process/index?code=${codeParser(result)}`})
              }
            })
        } else {
          app.toast('请使用正确的二维码');
        }
      }
    })
  },

  signout() {
    app.clearUserSession();
    wx.reLaunch({ url: '/pages/index/index' });
  }
})
