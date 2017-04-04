var util = require('util');
var Strategy = require('../strategy.js');

function FibonacciStrategy (options) {
  Strategy.call(this, options);
  this.cache = [1, 1];
}

util.inherits(FibonacciStrategy, Strategy);

FibonacciStrategy.prototype.getSubvalue = function (i) {
  if (i < 1) {
    return 1;
  }
  if (i in this.cache) {
    return this.cache[i];
  }
  return this.getSubvalue(i - 1) + this.getSubvalue(i - 2)
}

FibonacciStrategy.prototype.get = function (i) {
  return this.clampAndRandomise(i, this.getSubvalue(i));
}

module.exports = FibonacciStrategy;