'use strict';

const envvar = require('envvar');


const NODE_ENV = envvar.string('NODE_ENV');
const MONGOLAB_URI = envvar.number('MONGOLAB_URI');

let settings;
if (NODE_ENV === 'development') {
  settings = {
    db_url: 'mongodb://localhost/exports',
  };
} else if (NODE_ENV === 'production') {
  settings = {
    db_url: MONGOLAB_URI,
  };
}

module.exports = settings;
