'use strict';


exports.index = function*() {
  this.body = yield this.render('index', {
    test: 'test',
  });
};
