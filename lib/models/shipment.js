'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Shipment = new Schema({
  products: [{
    id: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
  }],
  documents: [{type: Schema.Types.ObjectId, ref: 'Document'}],
  name: String,
  freight_type: String,
  shipment_method: String,
  container: {},
  weight: {
    total: Number,
    net: Number,
  },
  origin: {
    street: String,
    street_number: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
    coordinates: {
      lat: Number,
      lon: Number,
    },
  },
  desination: {
    street: String,
    street_number: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
    coordinates: {
      lat: Number,
      lon: Number,
    },
  },
  departure_date: Date,
  arrival_date: Date,
  status: String,
});

module.exports = mongoose.model('Shipment', Shipment);
