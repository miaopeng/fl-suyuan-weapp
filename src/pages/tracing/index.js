import { queryBlock } from '../../service/api';

const app = getApp();

Page({
  data: {
    loading: false,
    error: '',
    blockId: 'C71AFGU02UILL66SFSS',
    product: {},
    tracing: {
      block: {},
      record: {},
    },
    markers: [],
    tracingLoading: false,
    tracingError: '',
    currentTab: 'tab-tracing',
    blockModalVisible: false,
  },

  onLoad() {
    const { product } = app;
    if (product.productId) {
      this.setData({ product });
    } else {
      this.setData({ error: '没有找到产品信息' });
    }
  },

  showBlockModal(e) {
    const { tid } = e.currentTarget.dataset;
    if (tid) {
      this.queryBlock(tid);
      this.setData({ blockModalVisible: true });
    }
  },

  hideBlockModal() {
    this.setData({ blockModalVisible: false });
  },

  handleChangeTab({ detail }) {
    this.setData({
      currentTab: detail.key,
    });
  },

  queryBlock(tid) {
    this.setData({
      tracingLoading: true,
      tracingError: false,
      tracing: {},
      markers: [],
    });
    queryBlock(tid).then(res => {
      console.log('res', res);
      this.setData({
        tracingLoading: false
      });
      if (res && res.data && res.data.code === 1) {
        const tracing = res.data.data;
        this.setData({
          tracingError: false,
          tracing,
          markers: [{
            id: 1,
            latitude: tracing.record.recAddrlatitude,
            longitude: tracing.record.recAddrlongitude,
          }],
        });
      } else {
        this.setData({
          tracingError: true
        })
      }
    })
  }
});
