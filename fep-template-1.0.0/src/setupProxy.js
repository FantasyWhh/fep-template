const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy(['/mobile/**', '/cms/**', '/user/**'], {
      target: 'https://www.xxx.com',
      secure: false,
      changeOrigin: true,
      xfwd: true,
      ws: false
    })
  );
};
