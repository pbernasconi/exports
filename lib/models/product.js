'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Product = new Schema({
  _shipment: Schema.Types.ObjectId,
  name: String,
  nickname: String,
  sku: String,
  hs_code: String,
  upc_code: String,
  unit_cost: {
    amount: Number,
    currency: String,
  },
});

module.exports = mongoose.model('Product', Product);
