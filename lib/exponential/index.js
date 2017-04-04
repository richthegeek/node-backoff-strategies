var util = require('util');
var assert = require('assert');
var _ = require('lodash');
var Strategy = require('../strategy.js');

function ExponentialStrategy (options) {
  Strategy.call(this, options)
  
  this.factor = _.get(options, 'factor', 2);
  assert(this.factor > 1, 'factor must be greater than 1');
}

util.inherits(ExponentialStrategy, Strategy);

ExponentialStrategy.prototype.get = function (i) {
  return this.clampAndRandomise(i, Math.pow(this.factor, i - 1));
}

module.exports = ExponentialStrategy