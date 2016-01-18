'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Document = new Schema({
  shipment_id: Schema.Types.ObjectId,
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model('Document', Document);
