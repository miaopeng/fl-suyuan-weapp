const URLSearchParams = require('url-search-params');
const { request } = require('wx-promise-request');

const app = getApp();

// eslint-disable-next-line import/prefer-default-export
export const signin = ({ username, password, type }) => {
  const params = new URLSearchParams();
  params.set('username', username);
  params.set('password', password);
  params.set('client_id', 'client_web');
  params.set('client_secret', 'client_web');
  params.set('grant_type', type);
  const url = `${app.API_URL}/oauth-server/oauth/token?${params}`;
  return request({ url, method: 'POST'});
}

export const signinCaptcha = ({ mobile }) => {
  const url = `${app.API_URL}/user-service/account/loginSmsCode`;
  return request({
    url,
    method: 'POST',
    body: { mobile }
  });
}