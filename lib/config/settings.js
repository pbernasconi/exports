'use strict';

const envvar = require('envvar');


const NODE_ENV = envvar.string('NODE_ENV');

let settings;
if (NODE_ENV === 'dev') {
  settings = {
    db_url: 'mongodb://localhost/exports',
    port: 3000,
  };
} else if (NODE_ENV === 'production') {
  const MONGOLAB_URI = envvar.number('MONGOLAB_URI');

  settings = {
    db_url: MONGOLAB_URI,
    port: process.env.PORT || 5000,
  };
}

module.exports = settings;
