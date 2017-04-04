const Strategy = require('../strategy.js');

module.exports = class FibonacciStrategy extends Strategy {
  constructor (options) {
    super(options);
    this.cache = [1, 1];
  }

  getSubvalue (i) {
    if (i < 1) {
      return 1;
    }
    if (i in this.cache) {
      return this.cache[i];
    }
    return this.getSubvalue(i - 1) + this.getSubvalue(i - 2)
  }

  get (i) {
    return this.clampAndRandomise(i, this.getSubvalue(i));
  }
}
