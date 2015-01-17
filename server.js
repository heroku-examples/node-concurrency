var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 3000;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start() {
  var express = require('express');
  var bcrypt = require('bcrypt');
  var app = express();

  app
    .get('/', sayHello)
    .listen(PORT, onListen);

  function sayHello(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(Date.now() + '', salt, function(err, hash) {
        if (err) return next(err);
        res.send('A hashed date for you! ' + hash);
      });
    });
  }

  function onListen() {
    console.log('Listening on', PORT);
  }
}
