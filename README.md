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