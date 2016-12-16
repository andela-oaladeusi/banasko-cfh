'use strict';

angular.module('mean.system')
  .controller('Auth', ['$scope', '$http', '$location', 'tokenAuth', function ($scope, $http, $location, tokenAuth) {

    if(tokenAuth.isAuthenticated()) {
      $location.path('/app');
    }

    $scope.signupUser = {};

    $scope.message = null;

    $scope.signup = () => {
      $http.post('/api/auth/signup', $scope.signupUser).then((res) => {
        $scope.message = res.data.message;
        tokenAuth.setToken(res.data.token);
        $location.path('/app');
      }, (err) => {
        $scope.message = err.data.message
      });
    }


    $scope.signinUser = {}
    $scope.signin = () => {
      $http.post('/api/auth/login', $scope.signinUser)
        .then((res) => {
          $scope.message = "Login successful";
          tokenAuth.setToken(res.data.token);
          $location.path('/app')
        },
        (err) => {
          $scope.message = "Invalid login details"
        });
    };


  }])