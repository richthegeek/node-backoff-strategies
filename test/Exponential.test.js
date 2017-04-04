var assert = require('assert');
var qs = require('querystring')
var Exponential = require('../index').Exponential;

describe('Exponential Strategy', function () {

  function test (options, i, expected, message) {
    options.i = i;

    it('should return ' + expected + ' for ' + qs.stringify(options, ','), function () {
      var strat = new Exponential(options);
      assert.equal(strat.get(i), expected, message);
    });
  }

  test({zeroMeansZero: true}, 0, 0);
  test({zeroMeansZero: false, multiplier: 10}, 0, 5);
  test({multiplier: 10}, 1, 10);
  test({multiplier: 10}, 2, 20);
  test({multiplier: 10}, 5, 160);
  test({multiplier: 10}, 10, 5120);
});