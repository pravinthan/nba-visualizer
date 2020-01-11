"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = exports.stats = undefined;

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stats = _api2.default.stats,
    data = _api2.default.data;
exports.stats = stats;
exports.data = data;
exports.default = _api2.default;