const _ = require('lodash');
const Strategy = require('../strategy.js');

module.exports = class ExponentialStrategy extends Strategy {
  constructor (options) {
    super(options);

    this.factor = _.get(options, 'factor', 2);
    if (this.factor <= 1) {
      throw new Error('factor must be greater than 1');
    }
  }

  get (i) {
    if (i === 0) {
      return this.clampAndRandomise(0);
    }
    return this.clampAndRandomise(Math.pow(this.factor, i - 1) * this.multiplier);
  }
}
