const _ = require('lodash');
const Strategy = require('../strategy.js');

module.exports = class PolynomialStrategy extends Strategy {
  constructor (options) {
    super(options);

    this.factor = _.get(options, 'factor', 2);
    if (this.factor <= 1) {
      throw new Error('factor must be greater than 1');
    }
  }

  get (i) {
    return this.clampAndRandomise(i, Math.pow(i, this.factor));
  }
}
