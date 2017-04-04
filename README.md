# node-backoff-strategies

A genericised set of backoff-suitable algorithms.

## Installation

`npm install backoff-strategies`

## General Options

* `minValue` _(default: 0)_ - the smallest value that may be returned
* `maxValue` _(default: Infinity)_ - the largest value that may be returned
* `multiplier` _(default: 1)_ - the scaling factor of the return value
* `randomisationFactor` _(default: 0)_ - increase the returned value by a random amount
* `zeroMeansZero` _(default: true)_ - overrides all other settings to always return 0 when i=0`
* `i` _(default: 0)_ - the initial i value (when using `strategy.next()` for generation)

## General Methods

* `get(i)` - returns the computed value for this step according to the strategy
* `next()` - returns `get(i)` for the current i value, then increments i
* `reset()` - resets i to zero

## Usage

### Linear Strategy
A monotonically increasing strategy, e.g. 0,1,2,3,4,5
```javascript
const Strategies = require('backoff-strategies');

var linearBackoff = new Strategies.Linear();

console.log(linearBackoff.next()); // 0
console.log(linearBackoff.next()); // 1
console.log(linearBackoff.next()); // 2

console.log(linearBackoff.get(6)); // 6
```

### Fibonnaci Strategy
A strategy increasing according to a Fabonacci sequence (1,1,2,3,5,8,13)
```javascript
const Strategies = require('backoff-strategies');

var fibonacciBackoff = new Strategies.Fibonacci({zeroMeansZero: false});

console.log(fibonacciBackoff.next()); // 1
console.log(fibonacciBackoff.next()); // 1
console.log(fibonacciBackoff.next()); // 2
console.log(fibonacciBackoff.next()); // 3

console.log(fibonacciBackoff.get(6)); // 13
```

### Exponential Strategy
An exponentially increasing strategy: `Math.pow(this.factor, i - 1)`

This accepts an additional `factor` option.
```javascript
const Strategies = require('backoff-strategies');

var expBackoff = new Strategies.Exponential({
    randomisationFactor: 0.5,
    multiplier: 10,
    maxValue: 300
});

console.log(expBackoff.next()); // 0
console.log(expBackoff.next()); // 13 - between 10 and 15
console.log(expBackoff.next()); // 26 - between 20 and 30
console.log(expBackoff.next()); // 57 - between 40 and 60

console.log(expBackoff.get(5)); // 167 - between 160 and 240
```

### Polynomial Strategy
A polynomially increasing strategy: `Math.pow(i, this.factor)`

This accepts an additional `factor` option.
```javascript
const Strategies = require('backoff-strategies');

var polyBackoff = new Strategies.Polynomial({
    randomisationFactor: 0.5,
    multiplier: 10,
    maxValue: 300
});

console.log(polyBackoff.next()); // 0
console.log(polyBackoff.next()); // 1
console.log(polyBackoff.next()); // 2 * 2 * 2 =8
console.log(polyBackoff.next()); // 3 * 3 * 3 = 27
console.log(polyBackoff.get(5)); // 5 * 5 * 5 = 125
```
