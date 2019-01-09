// const app = getApp()

Page({
  data: {
    productName: '赖茅酒(传承) 53%vol 500ml',
    enterpriseName: '贵州茅台股份有限公司',
    currentTab: 'tab-tracing',
    blockId: 'C71AFGU02UILL66SFSS'
  },

  handleChangeTab({ detail }) {
    this.setData({
      current: detail.key
    });
  }
})
