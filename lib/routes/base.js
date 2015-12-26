'use strict';


exports.index = function*(next) {
  yield this.render('index', {title: 'koa-hbs'});
  yield next;
};


exports.login = function*(next) {
  yield this.render('login', {title: 'koa-hbs'});
  yield next;
};


exports.postLogin = function*(next) {

  yield next;
};


exports.logout = function*(next) {
  yield next;
};


exports.signup = function*(next) {
  yield this.render('signup', {title: 'koa-hbs'});
  yield next;
};

exports.postSignup = function*(next) {
  yield next;
};
