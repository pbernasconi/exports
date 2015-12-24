'use strict';

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


// create session and store in Redis
app.keys = ['some secret key']; // needed for cookie-signing
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


// serve /dist statically
app.use(serve('./dist'));


// setup handlebar view rendering
app.use(hbs.middleware({
  viewPath: __dirname + '/views/',
}));


// setup routes
app.use(router.routes());


// create server and listen on port 8000
app.listen(8000);
console.log('server listening on 8000');
