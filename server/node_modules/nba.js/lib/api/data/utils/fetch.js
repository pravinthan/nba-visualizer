"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetch;

var _got = require("got");

var _got2 = _interopRequireDefault(_got);

var _constants = require("./../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make a request to the stats API and return an error-first callback with the
 * JSON response.
 *
 * @param {string} endpoint - Optional API endpoint
 * @param {Object} opts - Optional object of request options
 * @return {Promise} HTTP request response or error
 */
function fetch() {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  opts = Object.assign({
    headers: {
      "accept-encoding": "Accepflate, sdch",
      "accept-language": "he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4",
      "cache-control": "max-age=0",
      connection: "keep-alive",
      host: "data.nba.net",
      referer: "http://stats.nba.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36"
    },
    json: false
  }, opts);

  // eslint-disable-next-line no-useless-escape
  var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var url = re.test(endpoint) ? endpoint : "" + _constants.URL + endpoint;

  // in the case that endpoint is a URL, use endpoint, else concatenate the endpoint to URL
  return (0, _got2.default)(url, opts);
}