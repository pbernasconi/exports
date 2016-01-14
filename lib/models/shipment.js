'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Shipment = new Schema({
  name: String,
  freight_type: {

  },
  method: String,
  weight: {
    total: Number,
    net: Number,
  },
  origin: {
    title: String,
    coordinates: {
      lat: String,
      lon: String,
    },
  },
  desination: {
    title: String,
    coordinates: {
      lat: String,
      lon: String,
    },
  },
  pickup_date: Date,
  delivery_date: Date,
  status: String,
  company_id: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Shipment', Shipment);
