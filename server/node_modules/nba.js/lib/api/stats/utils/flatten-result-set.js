"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flattenResultSet;
/**
 * Flatten a result set by mapping each of it's rows' indices to
 * the respective header item.
 *
 * @param {Object[]} resultSets - Result set(s) to be flattened
 * @return {Promise}
 */
function flattenResultSet(resultSets) {
  return new Promise(function (resolve, reject) {
    var flattened = {};

    resultSets.forEach(function (result, i) {
      flattened[result.name] = result.rowSet.map(function (row, j) {
        var mappedRow = {};

        row.forEach(function (value, k) {
          var key = result.headers[k].toLowerCase();
          mappedRow[key] = value;
        });

        return mappedRow;
      });
    });

    return resolve(flattened);
  });
}