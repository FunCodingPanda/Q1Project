var convert = {};

convert.lbToKg = function (lbs) {
  return lbs / 2.2046;
}

convert.miToKm = function (mi) {
  return mi / 0.62137;
}

convert.galToL = function (gal) {
  return gal / 0.264172037;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = convert;
}


