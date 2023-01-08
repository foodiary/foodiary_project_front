const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rank',
    createProxyMiddleware({
      target: 'https://5695-2001-2d8-6b8a-3431-1153-40b7-90c4-ffb3.jp.ngrok.io',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    }),
  );
};