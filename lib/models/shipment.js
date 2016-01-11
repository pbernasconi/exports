'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Shipment = new Schema({
  name: String,
  method: String,
  weight: {
    total: Number,
    net: Number,
  },
  origin: {
    title: String,
    coordinates: {
      long: String,
      lat: String,
    },
  },
  desination: {
    title: String,
    coordinates: {
      long: String,
      lat: String,
    },
  },
  pickup_date: Date,
  delivery_date: Date,
  status: String,
  activity: [],
  documents: [],
});

module.exports = mongoose.model('Shipment', Shipment);
