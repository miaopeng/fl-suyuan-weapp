import scanerMixin from '../mixins/scaner';

Page({
  ...scanerMixin,

  data: {
  },

  onLoad({ q }) {
    if (q) this.parseCode(decodeURIComponent(q));
  },

});
