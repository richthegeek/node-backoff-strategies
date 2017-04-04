const _ = require('lodash');
const assert = require('assert');

module.exports = class Strategy {

  constructor (options) {
    this.minValue = _.get(options, 'minValue', 0);
    assert(this.minValue >= 0, 'minValue must be at least 0')

    this.maxValue = _.get(options, 'maxValue', Infinity);
    assert(this.maxValue >= 1, 'maxValue must be at least 1')
    assert(this.maxValue > this.minValue, 'minValue must be less than maxValue');

    this.i = _.get(options, 'i', 0);
    assert(this.i >= 0, 'i must be at least 0')

    this.multiplier = _.get(options, 'multiplier', 1);
    assert(this.multiplier >= 1, 'multiplier must be at least 1')

    this.randomisationFactor = _.get(options, 'randomisationFactor', 0);
    assert(this.randomisationFactor >= 0, 'randomisationFactor must be at least 0');
    assert(this.randomisationFactor <= 1, 'randomisationFactor must be no more than 1');

    this.zeroMeansZero = _.get(options, 'zeroMeansZero', true);
  }

  clampAndRandomise (i, value) {
    if (i === 0 && this.zeroMeansZero) {
      return 0;
    }

    return _.clamp(
      Math.round(value * this.multiplier * (1 + Math.random() * this.randomisationFactor)),
      this.minValue,
      this.maxValue
    );
  }

  get (i) {
    return this.clampAndRandomise(i, i);
  }

  next () {
    return this.get(this.i++);
  }

  reset () {
    this.i = 0;
  }
}
