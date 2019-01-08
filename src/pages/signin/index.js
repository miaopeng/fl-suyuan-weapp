import { signin, getProfile } from '../../service/user';
import isValidPhone from '../../utils/is-valid/phone';

const app = getApp();

Page({
  data: {
    withSms: true,
    mobile: '18601280503',
    captchaUrl: `${app.API_URL}/user-service/account/loginSmsCode`
  },

  bindMobile(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },

  switchMode(e) {
    const { withsms } = e.target.dataset;
    this.setData({
      withSms: !!withsms,
    });
  },

  loginWithSms(e) {
    const { mobile, sms_code: smsCode } = e.detail.value;
    if (!isValidPhone(mobile)) {
      app.toast('请输入正确的手机号');
      return;
    }

    if (!smsCode) {
      app.toast('请输入验证码');
      return;
    }

    wx.showLoading({
      title: '登录中'
    });

    signin({
      username: e.detail.value.mobile,
      password: e.detail.value.sms_code,
      type: 'smscode',
    }).then(res => {
      wx.hideLoading();
      if (res.statusCode !== 200) {
        app.toast('登录失败');
        return;
      }
      this.signInSuccess(res);
    });
  },

  getToken(res) {
    return res.data.data.access_token;
  },

  loginWithPass(e) {
    console.log('login');
    const { mobile, password } = e.detail.value;
    if (!isValidPhone(mobile)) {
      app.toast('请输入正确的手机号');
      return;
    }

    if (!password) {
      app.toast('请输入登录密码');
      return;
    }

    wx.showLoading({
      title: '登录中'
    });

    signin({
      username: e.detail.value.mobile,
      password: e.detail.value.password,
      type: 'password',
    }).then(res => {
      this.signInSuccess(res);
    });
  },

  signInSuccess(res) {
    if (this.getToken(res)) {
      app.setUserSession(this.getToken(res));
      getProfile().then((profile) => {
        console.log('res', profile);
        if (profile) {
          app.saveProfile(profile.data.data.userInfo);
          wx.reLaunch({ url: '/pages/user/index' });
        }
      })
    }
  },

  signup() {
    wx.redirectTo({
      url: '/pages/signup?from=session',
    });
  },
});
