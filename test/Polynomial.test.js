var assert = require('assert');
var qs = require('querystring')
var Polynomial = require('../index').Polynomial;

describe('Polynomial Strategy', function () {

  function test (options, i, expected, message) {
    options.i = i;

    it('should return ' + expected + ' for ' + qs.stringify(options, ','), function () {
      var strat = new Polynomial(options);
      assert.equal(strat.get(i), expected, message);
    });
  }

  test({zeroMeansZero: true}, 0, 0);
  test({zeroMeansZero: false, multiplier: 10}, 0, 0);
  test({multiplier: 10}, 1, 10 * 1);
  test({multiplier: 10}, 2, 10 * 4);
  test({multiplier: 10}, 5, 10 * 5 * 5);
  test({multiplier: 10, factor: 3}, 5, 10 * 5 * 5 * 5);
});