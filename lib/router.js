'use strict';

const compose = require('koa-compose');
const router = require('koa-router')();

const routes = require('./routes');
const middleware = require('./middleware');


router.get('/', routes.base.index);

router.get('/login', routes.auth.login);
router.post('/login', routes.auth.postLogin);
router.get('/logout', routes.auth.logout);
router.get('/signup', routes.auth.signup);
router.post('/signup', routes.auth.postSignup);


router.get('/api/container');


var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = router;
