import { queryRecords } from '../../service/api';

// const app = getApp()

Page({
  data: {
    code: '',
    loading: true,
    productName: '赖茅酒(传承) 53%vol 500ml',
    enterpriseName: '贵州茅台股份有限公司',
    currentTab: 'tab-tracing',
    blockId: 'C71AFGU02UILL66SFSS',
    productSpec: [
      { key: '品名', value: '赖茅酒(传承)' },
      { key: '香型', value: '酱香型' },
      { key: '酒精度', value: '53% vol' },
      { key: '容量', value: '500ml' }
    ]
  },

  onLoad({ code = '' }) {
    if (code) {
      queryRecords(code).then(res => {
        if (res && res.data.code === 1) {
          const { product, records } = res.data.data;
          this.setData({
            loading: false,
            code,
            product,
            records,
          });
        }
      });
    }
  },

  handleChangeTab({ detail }) {
    this.setData({
      currentTab: detail.key,
    });
  },
});
