(function () {

  'use strict';

  var supertest = require('supertest');

  module.exports = (function () {

    var server;
    var express = require('chai').expect;

    var mochaSupertest = {
      server: function (app) {
        server = supertest(app);
      },
      get: makeRequest('get'),
      post: makeRequest('post'),
      put: makeRequest('put'),
      patch: makeRequest('patch'),
      delete: makeRequest('delete'),
      expect: expectMethods()
    };

    return mochaSupertest;

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
          .set(opts.headers || this.headers || {})
          .send(opts.body || this.body || {})
          .end(function (err, res) {
            if (err) return done(err);
            this.res = res;
            done();
          }.bind(this));
        });
        cb();
      };
    }

    function expectMethods () {
      return {
        status: function (status) {
          describe('the response status code', function () {
            it('is ' + status, function () {
              expect(this.res.status).to.equal(status);
            });
          });
        },
        property: function (property) {
          describe('the response body', function () {
            it('contains the `' + property + '` property', function () {
              expect(this.res.body).has.property(property);
            });
          });
          return {
            withValue: function (value) {
              describe('the `'+property+'` value', function () {
                it('contains the expected value', function () {
                  expect(this.res.body[property]).to.deep.equal(value);
                });
              });
            }
          };
        }
      };
    }
  })();

})();
