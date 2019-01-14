const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT || 3000;

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);

function start() {
  const crypto = require('crypto');
  const express = require('express');
  const app = express();

  app
    .get('/cpu', cpuBound)
    .get('/memory', memoryBound)
    .get('/io', ioBound)
    .listen(PORT, onListen);

  function cpuBound(req, res, next) {
    const key = Math.random() < 0.5 ? 'ninjaturtles' : 'powerrangers';
    const hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    const date = Date.now() + '';
    hmac.setEncoding('base64');
    hmac.end(date, () => res.send('A hashed date for you! ' + hmac.read()));
  }

  function memoryBound(req, res, next) {
    const meg = new Array(1024 * 1024).join('X');
    setTimeout(function sendResponse() {
      res.send('Large response: ' + meg);
    }, 20).unref();
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
