"use strict";

var _endpointRunner = require("./utils/endpoint-runner");

var _endpointWorker = require("./utils/endpoint-worker");

var _constants = require("./constants");

var r = (0, _endpointRunner.run)(_endpointWorker.work);

Object.keys(_constants.DEFAULTS).forEach(function (d) {
  var o = _constants.DEFAULTS[d];
  exports[o.method] = function (query, cb) {
    return r(d, query, cb);
  };
});