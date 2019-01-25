import Promise from 'es6-promise';

function request(url, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      ...options,
      success: resolve,
      fail: reject,
    });
  });
}

module.exports = {
  request
};