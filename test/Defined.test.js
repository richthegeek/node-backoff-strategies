var assert = require('assert');
var qs = require('querystring')
var Defined = require('../index').Defined;

describe('Defined Strategy', function () {

  function test (options, i, expected, message) {
    options.i = i;

    it('should return ' + expected + ' for ' + qs.stringify(options, ','), function () {
      var strat = new Defined(options);
      assert.equal(strat.get(i), expected, message);
    });
  }

  test({values: [100]}, 0, 100);
  test({values: [1,2,3]}, 2, 3);
  test({values: [1,2,3]}, 5, 3);
});