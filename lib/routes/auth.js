'use strict';


exports.login = function*() {
  yield this.render('login', {title: 'koa-hbs'});
};


exports.postLogin = function*() {

};


exports.logout = function*() {
};


exports.signup = function*() {
  yield this.render('signup', {title: 'koa-hbs'});
};

exports.postSignup = function*() {

};
