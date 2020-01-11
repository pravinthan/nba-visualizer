"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formEndpoint;
/**
 * Replace temporary variables in each endpoint with the provided params.
 * @param  {string} endpoint - Raw endpoint with temp. variables placed in side double braces.
 * @param  {Object} params - Object of URL variables.
 * @return {string} Encoded endpoint.
 */
function formEndpoint(endpoint) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Object.keys(params).forEach(function (k) {
    if (params.hasOwnProperty(k)) {
      endpoint = endpoint.split("{{" + k + "}}").join(params[k]);
    }
  });
  return endpoint;
}