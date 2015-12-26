'use strict';

const cobody = require('co-body');
const R = require('ramda');


// parseBody verifies 'content-type' header, parses the request body and
// assigns it to `this.request.body`.
exports.parseBody = function*(next) {
  // Attempt to parse json.
  let $body;
  try {
    $body = yield cobody.json(this);
  } catch (err) {
    this.response.body = {error: 'error parsing json body', error_obj: err};
    this.response.status = 400;
    return;
  }

  // Check for an empty body.
  if ($body == null || R.length(R.keys($body)) === 0) {
    this.response.body = {error: 'invalid body', error_obj: {}};
    this.response.status = 400;
  } else {
    this.request.body = $body;
    yield next;
  }
};
