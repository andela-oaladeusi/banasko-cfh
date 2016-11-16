function sqrt(x) {
  return x * x;
}

describe('simple test ' , function() {
  it('should return sqrt ', function() {
    var root = sqrt(4);
    expect(root).toEqual(16);
  });
})