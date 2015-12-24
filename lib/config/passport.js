'use strict';

const mongoose = require('mongoose');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, id);
});


passport.use(new LocalStrategy(function*(username, password, done) {
  try {
    const user = yield User.findOne({username: username});
    if (user == null) {
      return done(null, false, {message: 'Incorrect username'});
    } else if (user.validPassword(password) === false) {
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;
