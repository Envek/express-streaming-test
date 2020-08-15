var express = require('express');
var path = require('path');
var logger = require('morgan');
var router = express.Router();
const JsonStreamStringify = require('json-stream-stringify');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

router.get('/sync', async function(request, response, next) {
  const immediate = Promise.resolve("Now");
  const postponed = new Promise((resolve) => setTimeout(() => resolve("or never!"), 1000));
  response.send({ immediate: await immediate, postponed: await postponed });
});

router.get('/streaming', async function(request, response, next) {
  response.type('json'); // This is solution for test failures, see https://github.com/Faleij/json-stream-stringify/issues/15
  const immediate = Promise.resolve("Now");
  const postponed = new Promise((resolve) => setTimeout(() => resolve("or never!"), 1000));
  new JsonStreamStringify({ immediate, postponed }).pipe(response);
});

app.use('/', router);

module.exports = app;
