'use strict';


const mongoose = require('mongoose');
const P = require('bluebird');

module.exports = new P(function(resolve, reject) {
  mongoose.connect('mongodb://localhost/exports');

  mongoose.connection.on('open', function() {
    resolve(mongoose.connection);
  });

  mongoose.connection.on('error', function(err) {
    reject(err);
  });
});
