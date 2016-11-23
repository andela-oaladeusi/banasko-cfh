'use strict';
const path = require('path'),
      rootPath = path.normalize(__dirname + '/../..')

module.exports = {
  root: rootPath,
<<<<<<< 83b453291f365bdc0f4346359cb1f3ab8d193c6a
  port: process.env.PORT || 3000,
  db: process.env.MONGOHQ_URL || 'mongodb://localhost/cfh'
};
