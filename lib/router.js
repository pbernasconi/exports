'use strict';

const compose = require('koa-compose');
const router = require('koa-router')();

const routes = require('./routes');
const middleware = require('./middleware');


// index.hbs
router.get('/', routes.base.index);

// authentication routes
router.get('/login/', routes.base.login);
router.post('/login/', routes.base.postLogin);
router.get('/logout/', routes.base.logout);
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


const clientRoutes = [
  '/',
  '/shipments',
  '/shipments/new',
  '/settings',
];

// catchall for angular
router.get('*', function*(next) {
  const url = this.request.url;

  if (clientRoutes.indexOf(url) >= 0) {
    yield this.render('index');
  }
  yield next;
});


module.exports = router;
