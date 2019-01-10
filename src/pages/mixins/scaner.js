import { queryRecords } from '../../service/api';
import { codeParser } from '../../utils/util';

const app = getApp();

const scaner = {
  handleScan() {
    wx.showLoading({ title: '检查二维码...' });
    wx.scanCode({
      success: ({ result }) => {
        this.parseCode(result);
      },
    });
  },

  parseCode(result) {
    const code = codeParser(result);
    if (code) {
      this.fetchProduct(code);
    } else {
      app.toast('请使用正确的二维码');
    }
  },

  fetchProduct(code) {
    queryRecords(code).then(res => {
      wx.hideLoading();
      if (res && res.data.code === 1) {
        const { product, records } = res.data.data;
        app.saveProduct({
          ...product,
          code,
          records,
        });
        wx.navigateTo({ url: '/pages/tracing/index' })
      } else {
        app.toast('请使用正确的二维码');
      }
    });
  }
}

module.exports = scaner;