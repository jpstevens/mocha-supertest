(function () {

  'use strict';

  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  ['get','put','patch','post','delete'].forEach(addRoute);

  function addRoute (method) {
    app[method]('/example', function (req, res) {
      res.json({
        method: method.toUpperCase(),
        header: req.headers['x-example-header'],
        body: req.body
      });
    });
  }

  module.exports = app;

})();
