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
      this.setData({ user });
    }
  },
  scan() {
    wx.scanCode({
      success({ result }) {
        if (result && codeParser(result)) {
          addRecord({ qrCodeId: codeParser(result)})
            .then(res => {
              
            })
        }
      }
    })
  },
})
