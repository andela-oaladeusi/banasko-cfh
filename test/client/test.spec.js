'use strict';

function squareRoot(x) {
  return x * x;
}

describe('simple test ' , function() {
  it('should return sqrt ', function() {
    let root = squareRoot(4);
    expect(root).toEqual(16);
  });
})
