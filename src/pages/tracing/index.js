const app = getApp();

Page({
  data: {
    loading: false,
    error: '',
    blockId: 'C71AFGU02UILL66SFSS',
    product: {},
    currentTab: 'tab-tracing',
  },

  onLoad() {
    const { product } = app;
    if (product.productId) {
      this.setData({ product });
    } else {
      this.setData({ error: '没有找到产品信息' });
    }
  },

  handleChangeTab({ detail }) {
    this.setData({
      currentTab: detail.key,
    });
  },
});
