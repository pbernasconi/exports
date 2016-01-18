'use strict';

const cobody = require('co-body');
const R = require('ramda');


exports.authenticate = function*(next) {
  yield next;
};


exports.requireAuth = function*(next) {
  yield next;
};
