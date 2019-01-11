import { queryBlock } from '../../service/api';
import { getRect } from '../../utils/util';

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
    introHeight: 0,
    currentTab: 'tab-tracing',
    blockModalVisible: false,
  },

  onLoad() {
    const { product } = app;
    if (product.productId) {
      this.setData({ product });
      this.initIntro();
      if (!product.records || product.records.length === 0) {
        this.setData({ error: '尚无溯源记录'});
      }
    } else {
      this.setData({ error: '没有找到产品信息' });
    }
  },

  initIntro() {
    const sysinfo = wx.getSystemInfoSync();
    const queries = [
      getRect('#header'),
      getRect('#tabs')
    ];
    Promise.all(queries).then(([headerRect, tabsRect]) => {
      const introHeight = sysinfo.windowHeight - headerRect.height - tabsRect.height;
      if (introHeight > 0) {
        this.setData({
          introHeight,
        });
      }
    })
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
