# node-backoff-strategies

A genericised set of backoff-suitable algorithms.

## Installation

`npm install backoff-strategies`

## Usage

```javascript
const Strategies = require('backoff-strategies');

var fibonacciBackoff = new Strategies.Fibonacci({
    randomisationFactor: 0,
    multiplier: 10,
    maxValue: 300
});

console.log(fibonacciBackoff.next()); // 10
console.log(fibonacciBackoff.next()); // 10
console.log(fibonacciBackoff.next()); // 20
console.log(fibonacciBackoff.next()); // 30

console.log(fibonacciBackoff.get(5)); // 80
```

```javascript
const Strategies = require('backoff-strategies');

var expBackoff = new Strategies.Exponential({
    randomisationFactor: 0,
    multiplier: 10,
    maxValue: 300
});

console.log(expBackoff.next()); // 0
console.log(expBackoff.next()); // 10
console.log(expBackoff.next()); // 20
console.log(expBackoff.next()); // 40

console.log(expBackoff.get(5)); // 160
```