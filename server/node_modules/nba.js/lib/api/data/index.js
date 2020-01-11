"use strict";

var _constants = require("./constants");

var _formEndpoint = require("./utils/form-endpoint");

var _formEndpoint2 = _interopRequireDefault(_formEndpoint);

var _worker = require("./utils/worker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loop = function _loop(e) {
  var o = _constants.ENDPOINTS[e];

  exports[o.method] = function (params, cb) {
    if (params instanceof Function) {
      cb = params;
      params = {};
    }

    var endpoint = (0, _formEndpoint2.default)(o.endpoint, params);
    return (0, _worker.work)(endpoint, cb);
  };
};

for (var e in _constants.ENDPOINTS) {
  _loop(e);
}