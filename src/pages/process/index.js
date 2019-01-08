import { queryRecords } from '../../service/api';

Page({
  data: {
  },

  onLoad({ code = ''}) {
    wx.showLoading();
    queryRecords(code)
      .then(res => {
        wx.hideLoading();
        if (res && res.data.code === 1) {
          this.setData({
            ...res.data.data.product,
            records: res.data.data.records,
          })
        }
      })
  },
})
