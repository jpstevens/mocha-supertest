(function () {

  'use strict';

  var supertest = require('supertest');

  module.exports = (function () {

    var server;

    return {
      server: function (app) {
        server = supertest(app);
      },
      get: makeRequest('get'),
      post: makeRequest('post'),
      put: makeRequest('put'),
      patch: makeRequest('patch'),
      delete: makeRequest('delete')
    };

    function makeRequest (method) {
      return function (opts, cb) {
        opts = extendOpts(opts, method);
        describe(getDescription(opts), describeCallback(opts, cb));
      };
    }

    function getDescription (opts) {
      return opts.method.toUpperCase() + ' ' + opts.url;
    }

    function extendOpts (opts, method) {
      if (typeof opts !== 'object') opts  = { url: opts };
      opts.method = method;
      return opts;
    }

    function describeCallback (opts, cb) {
      return function () {
        beforeEach(function (done) {
          server[opts.method](opts.url)
          .end(function (err, res) {
            if (err) return done(err);
            this.res = res;
            done();
          }.bind(this));
        });
        cb();
      };
    }

  })();

})();
