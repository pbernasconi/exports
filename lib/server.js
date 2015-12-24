'use strict';

const koa = require('koa');
const errorHandler = require('koa-error');
const hbs = require('koa-hbs');
const session = require('koa-generic-session');
const RedisStore = require('koa-redis');

const passport = require('./config/passport');
const router = require('./router');


const app = module.exports = koa();

app.use(errorHandler());

const db = require('./config/db');

app.use(session({
  key: 'exports-secret-key',
  store: RedisStore(),
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(hbs.middleware({
  viewPath: './views',
  partialsPath: '/views/partials',
}));

app.use(router.routes());


app.listen(3000);
console.log('server listening on 3000');
