function sqrt(x) {
<<<<<<< HEAD
  return x * x;

}

describe('simple test ' , function() {
  it('should return sqrt ', function() {
    var root = sqrt(4);
    expect(root).toEqual(16);
  });
=======
  return x * x
}

describe('simple test ' , function() {

  it('should return sqrt ', function() {
    var root = sqrt(4)
    expect(root).toEqual(16)
  })

>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
})