'use strict';

<<<<<<< 12763424cb22ec03dab37704134ffc7c2f833f5c
const path = require('path');
const rootPath = path.normalize(__dirname + '/../..');


let db = null;
if (process.env.NODE_ENV === 'development') {
  db = process.env.MONGODEV_URL;
}
if (process.env.NODE_ENV === 'test') {
  db = process.env.MONGOTEST_URL;
}
if (process.env.NODE_ENV === 'production') {
  db = process.env.MONGOHQ_URL;
}
=======
var path = require('path'),
  rootPath = path.normalize(__dirname + '/../..');
var keys = rootPath + '/keys.txt';
var testLocal = 'mongodb://localhost/cfh';
var SECRET = 'TESTING';
>>>>>>> feature(jwt_tokens):Update responses with status codes

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  db: db,
  secret: process.env.SECRET
};
