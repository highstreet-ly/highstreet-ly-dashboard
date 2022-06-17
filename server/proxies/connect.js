'use strict';
const exec = require('child_process').exec;
const proxyPath = '/connect';

module.exports = function (app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  let proxy = require('http-proxy').createProxyServer({});

  //exec("minikube ip", function (err, mkIp, stderr) {
  let mkIp = process.env.MINIKUBE_IP;

  proxy.on('error', function (err, req) {
    console.error(err, req.url);
  });

  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    console.log('proxying to ' + 'ids.' + process.env.DOMAIN)
    console.log('proxying to ' + mkIp)
    proxyReq.setHeader('HOST', 'ids.' + process.env.DOMAIN);
  });

  app.use(proxyPath, function (req, res, next) {
    // include root path in proxied request
    req.url = proxyPath + req.url;
    console.log(req.url)
    proxy.web(req, res, {
      target: `https://${mkIp}`,
    });
  });
  //});
};