'use strict';

const passport = require('koa-passport');

const User = require('../models').User;


exports.index = function*() {
  yield this.render('index', {title: 'koa-hbs'});
};


exports.login = function*() {
  yield this.render('login', {title: 'koa-hbs'});
};


exports.postLogin = function*() {
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/',
  });
};


exports.logout = function*() {
  this.logout();
  this.redirect('/login');
  yield next;
};


exports.signup = function*() {
  yield this.render('signup', {title: 'koa-hbs'});
};

exports.postSignup = function*() {
  const newUser = new User({});

};
