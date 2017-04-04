var assert = require('assert');
var Strategy = require('../lib/strategy');

describe('Core Strategy', function () {
  describe('Initialisation', function () {

    it('should reject minValue less than zero', function () {
      assert.throws(function () {
        new Strategy({minValue: -1})
      }, /minValue must be at least 0/);
    });

    it('should reject maxValue less than 1', function () {
      assert.throws(function () {
        new Strategy({maxValue: 0})
      }, /maxValue must be at least 1/);
    });

    it('should reject maxValue less than minValue', function () {
      assert.throws(function () {
        new Strategy({maxValue: 50, minValue: 51})
      }, /minValue must be less than maxValue/);
    });

    it('should reject i less than zero', function () {
      assert.throws(function () {
        new Strategy({i: -1})
      }, /i must be at least 0/);
    });

    it('should reject multiplier less than 1', function () {
      assert.throws(function () {
        new Strategy({multiplier: 0})
      }, /multiplier must be at least 1/);
    });

    it('should reject randomisationFactor less than 0', function () {
      assert.throws(function () {
        new Strategy({randomisationFactor: -1})
      }, /randomisationFactor must be at least 0/);
    });

    it('should reject randomisationFactor greater than 1', function () {
      assert.throws(function () {
        new Strategy({randomisationFactor: 2})
      }, /randomisationFactor must be no more than 1/);
    });

    it('should initialise everything by default', function () {
      var strat = new Strategy()
      assert.equal(strat.minValue, 0)
      assert.equal(strat.maxValue, Infinity)
      assert.equal(strat.i, 0)
      assert.equal(strat.multiplier, 1)
      assert.equal(strat.randomisationFactor, 0)
      assert.equal(strat.zeroMeansZero, true)
    });

    it('should initialise everything when passed', function () {
      var strat = new Strategy({minValue: 100, maxValue: 500, i: 5, multiplier: 200, randomisationFactor: 0.5, zeroMeansZero: false})
      assert.equal(strat.minValue, 100)
      assert.equal(strat.maxValue, 500)
      assert.equal(strat.i, 5)
      assert.equal(strat.multiplier, 200)
      assert.equal(strat.randomisationFactor, 0.5)
      assert.equal(strat.zeroMeansZero, false)
    });    
  });

  describe('clampAndRandomise(i, value)', function () {
    it('should return 0 when zeroMeansZero is true and i=0', function () {
      var strat = new Strategy({zeroMeansZero: true});
      assert.equal(strat.clampAndRandomise(0, 100), 0);
    });

    it('should return *value* when zeroMeansZero is false and i=0', function () {
      var strat = new Strategy({zeroMeansZero: false});
      assert.equal(strat.clampAndRandomise(0, 100), 100);
    });

    it('should return *value* when i=2', function () {
      var strat = new Strategy();
      assert.equal(strat.clampAndRandomise(2, 100), 100);
    });

    it('should return 500 when minValue=500 and value=100', function () {
      var strat = new Strategy({minValue: 500});
      assert.equal(strat.clampAndRandomise(5, 100), 500);
    });

    it('should return 500 when maxValue=500 and value=9999', function () {
      var strat = new Strategy({maxValue: 500});
      assert.equal(strat.clampAndRandomise(5, 9999), 500);
    });

    it('should return 50 when multipler=10 and i=5', function () {
      var strat = new Strategy({multiplier: 10});
      assert.equal(strat.clampAndRandomise(5, 5), 50);
    });

    it('should return randomly between >=50 and <= 100 when multipler=10 and i=5 and randomisationFactor=1', function () {
      var strat = new Strategy({randomisationFactor: 1, multiplier: 10});
      var values = {}, value, i;
      for (i = 0; i < 100; i ++) {
        value = strat.clampAndRandomise(5, 5);
        values[value] = true;
        assert(value >= 50, 'Resultant value was less than 50');
        assert(value <= 100, 'Resultant value was greater than 100');
      }
      assert(Object.keys(values).length > 1, 'Only one value was generated - not random!')
    });

    it('should return randomly between >=50 and <=75 when multipler=10 and i=5 and randomisationFactor=0.5', function () {
      var strat = new Strategy({randomisationFactor: 0.5, multiplier: 10});
      for (var value, i = 0; i < 100; i ++) {
        value = strat.clampAndRandomise(5, 5);
        assert(value >= 50, 'Resultant value was less than 50');
        assert(value <= 75, 'Resultant value was greater than 100');
      }
    });
  });

  describe('next()', function () {
    it('should increment i', function () {
      var strat = new Strategy({});
      assert.equal(strat.i, 0)
      strat.next()
      assert.equal(strat.i, 1)
      strat.next()
      assert.equal(strat.i, 2)
    })
  })

  describe('reset()', function () {
    it('should set i to 0', function () {
      var strat = new Strategy({i :5});
      assert.equal(strat.i, 5);
      strat.reset();
      assert.equal(strat.i, 0);     
    })
  })
});