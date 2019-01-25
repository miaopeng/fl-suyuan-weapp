const request = require('../utils/request').default;

// const app = getApp();

export function addRecord(params) {
  return request('/api/product/add_record', {
    method: 'POST',
    data: {
      ...params
    }
  });
}

export function queryRecords(code = '') {
  return request(`/api/qrcode/query_records/${code}`);
}

export function queryBlock(tid = '') {
  return request(`/api/transaction/search/${tid}`);
}