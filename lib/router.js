'use strict';

const compose = require('koa-compose');
const router = require('koa-router')();
const send = require('koa-send');

const routes = require('./routes');
const middleware = require('./middleware');


// authentication routes
router.get('/login/', routes.base.login);
router.post('/login/', routes.base.postLogin);
router.get('/logout/', compose([middleware.requireAuth]), routes.base.logout);
router.get('/signup/', routes.base.signup);
router.post('/signup/', routes.base.postSignup);

router.get('/api/shipment/', routes.shipment.getAll);
router.get('/api/shipment/:id', routes.shipment.getOne);
router.post('/api/shipment/', compose([
  middleware.parseBody,
]), routes.shipment.create);
router.patch('/api/shipment/', compose([
  middleware.parseBody,
]), routes.shipment.update);


router.get('/api/product/', routes.product.getAll);
router.get('/api/product/:id', routes.product.getOne);
router.post('/api/product/', compose([
  middleware.parseBody,
]), routes.product.create);
router.patch('/api/product/', compose([
  middleware.parseBody,
]), routes.product.update);


// index.hbs
router.get('/', compose([
  middleware.requireAuth,
]), routes.base.index);


// catchall for angular
router.get('/*', function*(next) {
  if (this.path.substr(0, 5).toLowerCase() === '/api/') {
    yield next;
    return;
  } else if (yield send(this, this.path, {root: this.distDir})) {
    return;
  } else if (this.path.indexOf('.') !== -1) {
    return;
  } else {
    yield this.render('index');
  }
});


module.exports = router;
