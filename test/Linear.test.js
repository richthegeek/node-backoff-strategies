var assert = require('assert');
var qs = require('querystring')
var Linear = require('../index').Linear;

describe('Linear Strategy', function () {

  function test (options, i, expected, message) {
    options.i = i;

    it('should return ' + expected + ' for ' + qs.stringify(options, ','), function () {
      var strat = new Linear(options);
      assert.equal(strat.get(i), expected, message);
    });
  }

  test({zeroMeansZero: false}, 0, 0);
  test({}, 0, 0);
  test({}, 1, 1);
  test({multiplier: 10}, 5, 50);
  test({multiplier: 10}, 10, 100);
});