'use strict';

const models = require('../../models');
const Shipment = models.Shipment;
const Activity = models.Activity;
const Product = models.Product;



// GET /shipment/
exports.getAll = function*(next) {
  this.body = yield Shipment.find().populate('activity');
  yield next;
};


// GET /shipment/:id
exports.getOne = function*(next) {
  let shipment = yield Shipment.findById(this.params.id).populate('products');
  shipment.activity = yield Activity.find({_shipment: shipment.id});
  this.body = shipment;
  yield next;
};


// POST /shipment/
exports.create = function*(next) {
  try {
    const newShipment = new Shipment(this.request.body);
    yield newShipment.save();
    this.body = newShipment;
  } catch (err) {
    this.body = err;
    this.response.status = 400;
  }
  yield next;
};


// PATCH /shipment/:id
exports.update = function*(next) {
  this.body = yield Shipment.findById();
  yield next;
};
