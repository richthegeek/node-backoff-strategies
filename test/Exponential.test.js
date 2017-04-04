const assert = require('assert');
const qs = require('querystring')
const Exponential = require('../index').Exponential;

describe('Exponential Strategy', () => {

  var test = (options, i, expected, message) => {
    options.i = i;

    it('should return ' + expected + ' for ' + qs.stringify(options, ','), () => {
      let strat = new Exponential(options);
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