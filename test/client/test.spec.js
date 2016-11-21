'use strict';

function squareRoot(x) {
  return x * x;
}

describe('simple test ' , function() {
  it('should return sqrt ', function() {
    let root = sqrt(4);
    expect(root).toEqual(16);
  });
})
