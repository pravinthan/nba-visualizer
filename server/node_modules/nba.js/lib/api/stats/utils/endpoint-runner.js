"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _constants = require("./../constants");

/**
 * Endpoint runner wrapper.
 * @param {Function} worker - Worker function to be used
 * @return {Function} Request function
 */
function run(worker) {
  /**
   * Make request
   * @param {string} type - Endpoint name
   * @param {Object|Function} query - Optional request query
   * @param {Function} cb - Error-first cb
   * @return {Function} Request response or error
   */
  return function (type, query, cb) {
    if (!worker) {
      return cb(new Error("Expected worker function."));
    }

    if (!_constants.DEFAULTS.hasOwnProperty(type)) {
      return cb(new Error("Invalid endpoint type."));
    }

    return worker(_constants.DEFAULTS[type], query, cb);
  };
}