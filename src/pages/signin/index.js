import isValidPhone from '../../utils/is-valid/phone';

const app = getApp();

Page({
  data: {
    withSms: true,
    mobile: '18601280503',
    captchaUrl: `${app.API_URL}/account/login_sms_code`
  },

  bindMobile(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },

  switchMode(e) {
    const { withsms } = e.target.dataset;
    console.log('withsms', withsms);
    this.setData({
      withSms: !!withsms,
    });
  },

  loginWithSms(e) {
    const { mobile, sms_code: smsCode } = e.detail.value;
    if (!isValidPhone(mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    if (!smsCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    wx.request({
      url: `${app.API_URL}/oauth/token?username=${ e.detail.value.mobile }&password=${  e.detail.value.sms_code  }&client_id=client_web&client_secret=test&grant_type=smscode`,
      method: 'POST',
      data: {},
      success: res => {
        if(res.data.error==="Invalid Exception"){
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
            duration: 2000,
          });
        }else{
          this.signInSuccess(res);
        }
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  getToken(res) {
    return res.data.access_token;
  },

  loginWithPass(e) {
    console.log('form data', e);
    const { mobile, password } = e.detail.value;
    if (!isValidPhone(mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    if (!password) {
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    wx.request({
      url: `${app.API_URL}/oauth-server/oauth/token?username=${ e.detail.value.mobile }&password=${  e.detail.value.password  }&client_id=client_web&client_secret=client_web&grant_type=password`,
      method: 'POST',
      data: {},
      success: res => {
        console.log('res', res, res.status);

        if (res.statusCode !== 200) {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000,
          });
          return;
        }

        if(res.data.error==="Invalid Exception"){
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 2000,
          });
          return;
        }

        this.signInSuccess(res);
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  signInSuccess(res) {
    if (this.getToken(res)) {
      app.setUserSession(this.getToken(res));
    }
    wx.showToast({
      title: '登陆成功',
      icon: 'none',
      duration: 2000,
    });

    wx.reLaunch({ url: '/pages/index/index' });
  },

  signup() {
    wx.redirectTo({
      url: '/pages/signup?from=session',
    });
  },
});
