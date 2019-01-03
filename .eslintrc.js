module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
    es6: true,
  },
  globals: {
    wx: false,
    App: false,
    getApp: false,
    Page: false,
  },
  rules: {
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }],
    'linebreak-style': 0,
    'no-plusplus': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
