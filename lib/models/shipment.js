'use strict';

const P = require('bluebird');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Shipment = new Schema({
  name: String,
  origin: String,
  desination: String,
  delivery: Date,
  status: String,
});

module.exports = mongoose.model('Shipment', Shipment);
