'use strict';
const path = require('path'),
      rootPath = path.normalize(__dirname + '/../..')

module.exports = {
  root: rootPath,
<<<<<<< f8e3f415a8c266240efb7958a79e137aed03416f
  port: process.env.PORT || 3000,
  db: process.env.MONGOHQ_URL || 'mongodb://localhost/cfh'
};
