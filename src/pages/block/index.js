import { queryBlock } from '../../service/api';

Page({
  data: {
    show: true
  },

  onLoad({ tid }) {
    if (tid) this.queryBlock(tid);
  },

  onClose() {
    this.setData({ show: false });
  },

  queryBlock(tid) {
    queryBlock(tid).then(res => {
      console.log('res', res);
    })
  }

});
