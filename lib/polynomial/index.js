var util = require('util');
var assert = require('assert');
var _ = require('lodash');
var Strategy = require('../strategy.js');

function PolynomialStrategy (options) {
  Strategy.call(this, options)
  
  this.factor = _.get(options, 'factor', 2);
  assert(this.factor > 1, 'factor must be greater than 1');
}

util.inherits(PolynomialStrategy, Strategy);

PolynomialStrategy.prototype.get = function (i) {
  return this.clampAndRandomise(i, Math.pow(i, this.factor));
}

module.exports = PolynomialStrategy;