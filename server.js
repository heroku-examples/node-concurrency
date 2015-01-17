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
    .get('/', sayHello)
    .listen(PORT, onListen);

  function sayHello(req, res, next) {
    var hmac = crypto.createHmac('sha512WithRSAEncryption', 'ninjaturtles');
    var date = Date.now() + '';
    hmac.setEncoding('base64');
    hmac.end(date, function() {
      res.send('A hashed date for you! ' + hmac.read());
    });
  }

  function onListen() {
    console.log('Listening on', PORT);
  }
}
