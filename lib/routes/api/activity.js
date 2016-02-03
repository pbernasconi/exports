'use strict';

const Activity = require('../../models').Activity;


// GET /activity/:id
exports.getOne = function*(next) {
  this.body = yield Activity.findById(this.params.id);
  yield next;
};


// GET /activity/
exports.getAll = function*(next) {
  this.body = yield Activity.find();
  yield next;
};


// POST /activity/
exports.create = function*(next) {
  try {
    const newProduct = new Activity(this.request.body);
    yield newProduct.save();
    this.body = newProduct;
  } catch (err) {
    this.body = err;
    this.response.status = 400;
  }
  yield next;
};


// PATCH /activity/:id
exports.update = function*(next) {
  this.body = yield Activity.findById();
  yield next;
};
