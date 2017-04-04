const _ = require('lodash');

module.exports = class Strategy {

  constructor (options) {
    this.minValue = _.get(options, 'minValue', 0);
    if (this.minValue < 0) {
      throw new Error('minValue must be greater than 0');
    }

    this.maxValue = _.get(options, 'maxValue', Infinity);
    if (options.maxValue < 1) {
      throw new Error('maxValue must be greater than 1');
    }
    if (options.maxValue <= options.minValue) {
      throw new Error('minValue must be less than maxValue');
    }

    this.i = _.get(options, 'i', 0);
    if (this.i < 0) {
      throw new Error('i must be greater than or equal to 0');
    }

    this.multiplier = _.get(options, 'multiplier', 1000);
    if (this.multiplier <= 0) {
      throw new Error('multiplier must be greater than 0');
    }    

    this.randomisationFactor = _.get(options, 'randomisationFactor', 0);
    if (this.randomisationFactor < 0 || this.randomisationFactor > 1) {
      throw new Error('randomisationFactor must be between 0 and 1');
    }
  }

  clampAndRandomise (value) {
    return _.clamp(
      Math.round(value * (1 + Math.random() * this.randomisationFactor)),
      this.minValue,
      this.maxValue
    );
  }

  get (i) {
    return this.clampAndRandomise(i * this.multiplier);
  }

  next () {
    return this.get(this.i++);
  }

  reset () {
    this.i = 0;
  }
}
