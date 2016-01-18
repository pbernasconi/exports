'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Activity = new Schema({
  _shipment: {type: Schema.Types.ObjectId, ref: 'Shipment', index: true},
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Activity', Activity);
