'use strict';

const Shipment = require('../../models/shipment');


// GET /shipment/:id
exports.getOne = function*(next) {
  this.response.body = yield Shipment.findById(this.params.id);
  yield next;
};


// GET /shipment/
exports.getAll = function*(next) {
  this.response.body = yield Shipment.find();
  yield next;
};


// POST /shipment/
exports.create = function*(next) {
  try {
    const newShipment = new Shipment(this.request.body);
    yield newShipment.save();
    this.response.body = newShipment;
  } catch (err) {
    this.response.body = err;
    this.response.status = 400;
  }
  yield next;
};


// PATCH /shipment/:id
exports.update = function*(next) {
  this.response.body = yield Shipment.findById();
  yield next;
};
