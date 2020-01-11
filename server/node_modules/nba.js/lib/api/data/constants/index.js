"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINTS = exports.URL = undefined;

var _endpoints = require("./endpoints");

var ENDPOINTS = _interopRequireWildcard(_endpoints);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var URL = exports.URL = "http://data.nba.net/";
exports.ENDPOINTS = ENDPOINTS;