angular.module('mean.system')
  .controller('Auth', ['$scope', '$http', '$location', 'tokenAuth',
  function ($scope, $http, $location, tokenAuth, $window) {

    if(tokenAuth.isAuthenticated()) {
      $location.path($location.path() + '/app?game=custom')
    }

    $scope.signupUser = {};

    $scope.message = null;

    $scope.signup = () => {
      $http.post('/api/auth/signup', $scope.signupUser).then((res) => {
        $scope.message = res.data.message;
        tokenAuth.setToken(res.data.token);
        $location.path('/app?custom');
      }, (err) => {
        $scope.message = err.data.message;
      });
    };


    $scope.signinUser = {};
    $scope.signin = () => {
      $http.post('/api/auth/login', $scope.signinUser)
        .then((res) => {
          $scope.message = "Login successful";
          tokenAuth.setToken(res.data.token);
          $location.path('/app?custom');
        },
        (err) => {
          $scope.message = 'Invalid login details';
        });
    };
  }]);
