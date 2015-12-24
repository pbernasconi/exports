'use strict';

const bcrypt = require('bcrypt');
const P = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
  username: String,
  email: String,

});


User.pre('save', function(done) {
  if (!this.isModified('password')) {
    return done();
  }

  P.coroutine(function*() {
    try {
      var salt = yield bcrypt.genSalt();
      var hash = yield bcrypt.hash(this.password, salt);
      this.password = hash;
      done();
    } catch (err) {
      done(err);
    }
  });
});

User.methods.comparePassword = function*(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', User);
