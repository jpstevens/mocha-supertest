require('./helpers');

describe('mocha-supertest', function () {
  http.server(require('./sample-server'));
  shared.scenario('mocha-supertest for method', function (method) {

    describe('#'+method.toLowerCase(), function () {

      describe('by default', function () {
        http[method.toLowerCase()]('/example', function () {
          it('returns the expected response', function () {
            expect(this.res.body).to.deep.equal({
              method: method.toUpperCase(), body: {}
            });
          });
        });
      });

      describe('with headers', function () {
        http[method.toLowerCase()]({
          url: '/example',
          headers: { 'x-example-header': 'HEADER' }
        }, function () {
          it('returns the expected response', function () {
            expect(this.res.body).to.deep.equal({
              method: method.toUpperCase(), header: 'HEADER', body: {}
            });
          });
        });
      });

      describe('with body', function () {
        http[method.toLowerCase()]({
          url: '/example',
          body: { working: true }
        }, function () {
          it('returns the expected response', function () {
            expect(this.res.body).to.deep.equal({
              method: method.toUpperCase(), body: { working: true }
            });
          });
        });
      });

      describe('with header and body', function () {
        http[method.toLowerCase()]({
          url: '/example',
          headers: { 'x-example-header': 'HEADER' },
          body: { working: true }
        }, function () {
          it('returns the expected response', function () {
            expect(this.res.body).to.deep.equal({
              method: method.toUpperCase(), header: 'HEADER', body: { working: true }
            });
          });
        });
      });
    });

  });

  shared.scenario('mocha-supertest for method', 'get');
  shared.scenario('mocha-supertest for method', 'put');
  shared.scenario('mocha-supertest for method', 'post');
  shared.scenario('mocha-supertest for method', 'patch');
  shared.scenario('mocha-supertest for method', 'delete');

  describe('#expect.status', function () {
    http.get({
      url: '/example',
      body: { working: true }
    }, function (response) {
      console.log(response);
      http.expect.status(200);
      http.expect.property('method').withValue('GET');
      http.expect.property('body');
    });
  });
});
