'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Product = new Schema({
  shipment_id: Schema.Types.ObjectId,
  type: String,
});

module.exports = mongoose.model('Product', Product);
