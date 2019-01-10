let isIPhoneXCache = null;

function getIsIPhoneX() {
  return new Promise((resolve, reject) => {
    if (isIPhoneXCache !== null) {
      resolve(isIPhoneXCache);
    } else {
      wx.getSystemInfo({
        success: ({ model, screenHeight }) => {
          const iphoneX = /iphone x/i.test(model);
          const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
          isIPhoneXCache = iphoneX || iphoneNew;
          resolve(isIPhoneXCache);
        },
        fail: reject
      });
    }
  });
}

export default Behavior({
  properties: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },

  created() {
    getIsIPhoneX().then(isIPhoneX => {
      this.setData({ isIPhoneX });
    });
  }
});