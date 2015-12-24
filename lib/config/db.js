'use strict';


const mongoose = require('mongoose');
const P = require('bluebird');

module.exports = new P(function(resolve, reject) {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
      },
    },
  };

  mongoose.connect('mongodb://localhost/exports', options);

  mongoose.connection.on('error', err => {
    reject(err);
  });

  mongoose.connection.once('open', () => {
    resolve(mongoose.connection);
  });
});
