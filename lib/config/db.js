'use strict';


const mongoose = require('mongoose');
const P = require('bluebird');

const settings = require('settings');


module.exports = new P(function(resolve, reject) {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
      },
    },
  };

  mongoose.connect(settings.db_url, options);

  mongoose.connection.on('error', err => {
    reject(err);
  });

  mongoose.connection.once('open', () => {
    resolve(mongoose.connection);
  });
});
