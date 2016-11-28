'use strict';

<<<<<<< 5e1c03765d632b29442fe3c122527f9c62a91066
const path = require('path');
const rootPath = path.normalize(__dirname + '/../..');
=======
const path = require('path'),
  rootPath = path.normalize(__dirname + '/../..');
  require('dotenv').config({silent: true});
>>>>>>> feature(jwt-tokens):Update files to address PR feedback

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

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  db: db,
  secret: process.env.SECRET
<<<<<<< 5e1c03765d632b29442fe3c122527f9c62a91066
};
=======
};
>>>>>>> feature(jwt-tokens):Update files to address PR feedback
