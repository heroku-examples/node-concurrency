var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 3000;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start() {
  var crypto = require('crypto');
  var express = require('express');
  var app = express();

  app
    .get('/cpu', cpuBound)
    .get('/memory', memoryBound)
    .get('/io', ioBound)
    .listen(PORT, onListen);

  function cpuBound(req, res, next) {
    var key = Math.random() < 0.5 ? 'ninjaturtles' : 'powerrangers';
    var hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    var date = Date.now() + '';
    hmac.setEncoding('base64');
    hmac.end(date, function() {
      res.send('A hashed date for you! ' + hmac.read());
    });
  }

  function memoryBound(req, res, next) {
    var hundredk = new Array(100 * 1024).join('X');
    setTimeout(function sendResponse() {
      res.send('Large response: ' + hundredk);
    }, 50).unref();
  }

  function ioBound(req, res, next) {
    setTimeout(function SimulateDb() {
      res.send('Got response from fake db!');
    }, 300).unref();
  }

  function onListen() {
    console.log('Listening on', PORT);
  }
}
