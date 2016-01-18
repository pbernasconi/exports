'use strict';

const normalize = require('path').normalize;

const koa = require('koa');
const errorHandler = require('koa-error');
const hbs = require('koa-hbs');
const session = require('koa-generic-session');
const serve = require('koa-static');
const MongoStore = require('koa-session-mongo');

const passport = require('./config/passport');
const router = require('./router');


const app = module.exports = koa();

// error handling middleware
app.use(errorHandler());


// setup the db
app.use(function*(next) {
  app.context.db = yield require('./config/db');
  yield next;
});


// setup dist
app.use(function *(next) {
  this.distDir = normalize(__dirname + '/../dist');
  yield next;
});


// create session and store in Redis
app.keys = ['totai']; // needed for cookie-signing
app.use(function*(next) {
  session({
    store: MongoStore.create({
      mongoose: app.context.db,
    }),
  });
  yield next;
});


// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// setup handlebar view rendering
app.use(hbs.middleware({
  viewPath: __dirname + '/views/',
}));


// serve /dist statically
app.use(serve(normalize(__dirname + '/../dist/')));


// setup routes
app.use(router.routes());


// create server and listen on port 3000
app.listen(3000);
console.log('server listening on 3000');
