# mocha-supertest

[![Build Status](https://travis-ci.org/jpstevens/mocha-supertest.svg)](https://travis-ci.org/jpstevens/mocha-supertest)

Supertest helper for Mocha.

## Installation

```bash
npm install mocha-supertest --save-dev
```

## Example Usage

```javascript
var http = require('mocha-supertest'),
    app = require('./path/to/app');

describe('some test', function () {
  http.server(app);
  http.get('/example', function () {
    http.expect.status(200);
  });
});
```
## Methods

### connect(mongoUrl, [options={}])

**Description**
Connect to the specified database. Runs in a "before" block. Assigns the database connection instance to `this.db`. Can take an optional `options` object (see below).

**Example**
```javascript
db.connect(process.env.MONGO_URL, { lib: 'mongojs' })
before(function () {
  this.db.users.find({}, function (err, users) {
    // do stuff here
  });
});
```

**Options**

- `lib` - Which library to use for MongoDB, either [`mongojs`](https://www.npmjs.com/package/mongojs) or [`supertest`](https://www.npmjs.com/package/supertest) (default `supertest`)

### create(collection, query)

**Alias**
`add`, `create`

**Description**
Create a new object in a collection. Runs in a "beforeEach" block.

**Example**
```javascript
db.create('user', { firstName: 'John', lastName: 'Smith' });
// db.add('user', { firstName: 'John', lastName: 'Smith' });
```

### remove(collection, query)

**Alias**
`delete`, `remove`

**Description**
Remove objects from a collection. Runs in a "beforeEach" block.

**Example**
```javascript
db.remove('user', { firstName: 'John' });
// db.delete('user', { firstName: 'John' });
```

## dropDb()

**Description**
Drops the current database. Runs in a "beforeEach" block.

**Example**
```javascript
db.dropDb();
```
