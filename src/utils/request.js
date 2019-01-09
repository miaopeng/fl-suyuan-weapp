const { request: wxRequest } = require('wx-promise-request');
const Url = require('url-parse');

const app = getApp();

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const failMessage = '请求失败，请稍后再试';

const checkStatus = response => {
  const { statusCode } = response;
  if (statusCode >= 200 && statusCode < 300) {
    return response;
  }
  const errortext = codeMessage[statusCode] || response.errMsg;
  const error = new Error(errortext);
  error.name = statusCode;
  error.response = response;
  throw error;
};

const checkCode = response => {
  if (response.data && response.data.code === 1) {
    return response;
  }
  const errortext = response.data.msg || '请求没有成功，请稍后再试';
  const error = new Error(errortext);
  error.name = 'code';
  error.message = errortext;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  option,
) {
  let newURL = url;

  console.log('request', url, app.getToken());
  if (url.startsWith(`/api/`)) {
    const parsedURL = new Url(url.replace(/^\/api/, ''), true);
    if (app.getToken()) {
      parsedURL.set('query', { 'access_token': app.getToken()});
    }
    parsedURL.set('hostname', `${app.API_URL}/user-service`);
    console.log('parsedURL.href', parsedURL.href);
    newURL = parsedURL.href;
  }

  const newOptions = {
    url: newURL,
    ...option,
  };

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return wxRequest(newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.wrapResponse) {
        const data = {
          code: 1,
          data: response.data,
          msg: 'ok',
        };
        return {
          ...response,
          data,
        }
      }
      return response;
    })
    .then(checkCode)
    .catch(e => {
      wx.hideLoading();
      const { name: status, message } = e;
      console.log('request catched', status, message);

      if (status === 400) {
        app.toast(failMessage);
        return;
      }

      if (status === 401) {
        app.toast(failMessage);
        return;
      }

      if (status === 403) {
        app.toast(failMessage);
        return;
      }
      if (status <= 504 && status >= 500) {
        app.toast(failMessage);
        return;
      }
      if (status >= 404 && status < 422) {
        app.toast(failMessage);
        return;
      }

      if (message) {
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false,
        });
        return;
      }

      app.toast(failMessage);
    });
}
