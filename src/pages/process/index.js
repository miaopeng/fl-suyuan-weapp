import { queryRecords } from '../../service/api';

Page({
  data: {
    loading: true,
  },

  onLoad({ code = ''}) {
    wx.showLoading();
    queryRecords(code)
      .then(res => {
        wx.hideLoading();
        if (res && res.data.code === 1) {
          this.setData({
            loading: false,
            code,
            ...res.data.data.product,
            records: res.data.data.records,
          })
        }
      })
  },
})
