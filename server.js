var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 3000;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start() {
  var express = require('express');
  var app = express();

  app
    .get('/', sayHello)
    .listen(PORT, onListen);

  function sayHello(req, res, next) {
    res.send('Hello, world!');
  }

  function onListen() {
    console.log('Listening on', PORT);
  }
}
