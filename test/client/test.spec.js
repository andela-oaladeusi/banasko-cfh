function square(x) {
  return x * x;
}

describe('simple test ' , function() {
  it('should return sqrt ', function() {
    var root = square(4);
    expect(root).toEqual(16);
  });
})

