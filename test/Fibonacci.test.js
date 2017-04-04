var assert = require('assert');
var qs = require('querystring')
var Fibonacci = require('../index').Fibonacci;

describe('Fibonacci Strategy', function () {

  function test (options, i, expected, message) {
    options.i = i;

    it('should return ' + expected + ' for ' + qs.stringify(options, ','), function () {
      var strat = new Fibonacci(options);
      assert.equal(strat.get(i), expected, message);
    });
  }

  test({zeroMeansZero: true}, 0, 0);
  test({zeroMeansZero: false, multiplier: 10}, 0, 10);
  test({multiplier: 10}, 1, 10);
  test({multiplier: 10}, 2, 20);
  test({multiplier: 10}, 3, 30);
  test({multiplier: 10}, 4, 50);
  test({multiplier: 10}, 5, 80);

  it('should utilise the cache', function () {
    var strat = new Fibonacci();
    var _orig = strat.getSubvalue.bind(strat);
    
    strat.cache[4] = 99;
    var count = 0;
    strat.getSubvalue = function (i) {
      count++;
      return _orig(i)
    }

    assert.equal(strat.get(4), 99)
    assert.equal(strat.get(4), 99)
    assert.equal(strat.get(4), 99)
    assert.equal(strat.get(4), 99)
    assert.equal(count, 4)
  });

});