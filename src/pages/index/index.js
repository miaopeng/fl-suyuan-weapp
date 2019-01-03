Page({
  data: {
  },
  onLoad (options) {
    this.setData({
      q: options.q ? decodeURIComponent(options.q) : ''
    });
  },
})
