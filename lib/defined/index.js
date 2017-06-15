var util = require('util');
var assert = require('assert');
var _ = require('lodash');
var Strategy = require('../strategy.js');

function DefinedStrategy (options) {
  options.zeroMeansZero = _.get(options, 'zeroMeansZero', false);

  Strategy.call(this, options)
  
  this.values = _.get(options, 'values');
  assert(Array.isArray(this.values), 'values must be an array');
}

util.inherits(DefinedStrategy, Strategy);

DefinedStrategy.prototype.get = function (i) {
  return this.clampAndRandomise(i, _.get(this.values, i, _.last(this.values)));
}

module.exports = DefinedStrategy;