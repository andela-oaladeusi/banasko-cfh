'use strict';

function square(x) {
  return x * x;
}

describe('simple test ' , function() {
  it('should return square of 4', function() {
    const sqr = square(4);
    expect(sqr).toEqual(16);
  });
});