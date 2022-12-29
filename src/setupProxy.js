const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/oauth/google/callback',
    createProxyMiddleware({
      target: 'https://84ad-211-58-204-152.jp.ngrok.io',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    }),
  );
};