"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.work = work;

var _fetch = require("./fetch");

var _fetch2 = _interopRequireDefault(_fetch);

var _flattenResultSet = require("./flatten-result-set");

var _flattenResultSet2 = _interopRequireDefault(_flattenResultSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make a request, parse & flatten the response and return it.
 * @param {string} endpoint - URL endpoint
 * @param {Object} query - URL query params for this request
 * @param {Function} cb - Error-first callback
 * @return {Function} Flattened API response
 */
function get(endpoint, query, cb) {
  (0, _fetch2.default)(endpoint, { query: query }).then(function (res) {
    return res.body;
  }).then(function (body) {
    return JSON.parse(body);
  }).then(function (json) {
    return (0, _flattenResultSet2.default)(json.resultSets || [json.resultSet]);
  }).then(function (flattened) {
    return cb(null, flattened);
  }).catch(function (err) {
    return cb(Object.assign(err, {
      body: err.statusCode && err.statusMessage && err.response && err.response.body ? err.response.body : err.message
    }));
  });
}

/**
 * Make the request and return the response/error in a Promise & callback.
 * @param {Object} constants Endpoint constants
 * @param {Object} query - Query defaults
 * @param {Function} cb - Error first callback
 * @return {Function|Promise} Request response / error
 */
function work(constants, query, cb) {
  if (typeof query === "function") {
    cb = query;
    query = null;
  }

  query = Object.assign(constants.defaults, query || {});

  var doRequest = function doRequest(handleResponse, handleError) {
    return get(constants.endpoint, query, function (err, res) {
      if (err) return handleError(err);
      return handleResponse(res);
    });
  };

  if (cb) return doRequest(function (res) {
    return cb(null, res);
  }, cb);
  return new Promise(doRequest);
}