var assert = require('assert');

var convert = require('../convert');

describe('converters', function() {

  it('should be able to convert weights', function() {
    assert.equal(convert.lbToKg(2.2046), 1.0);
  });

  it('should be able to convert distance', function() {
    assert.equal(convert.miToKm(0.62137), 1.0);
  });

  it('should be able to convert volume', function() {
    assert.equal(convert.galToL(0.264172037), 1.0);
  });

});
