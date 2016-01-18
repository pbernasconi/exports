'use strict';

const Product = require('../../models').Product;


// GET /product/:id
exports.getOne = function*(next) {
  this.body = yield Product.findById(this.params.id);
  yield next;
};


// GET /product/
exports.getAll = function*(next) {
  this.body = yield Product.find();
  yield next;
};


// POST /product/
exports.create = function*(next) {
  try {
    const newProduct = new Product(this.request.body);
    yield newProduct.save();
    this.body = newProduct;
  } catch (err) {
    this.body = err;
    this.response.status = 400;
  }
  yield next;
};


// PATCH /product/:id
exports.update = function*(next) {
  this.body = yield Product.findById();
  yield next;
};
