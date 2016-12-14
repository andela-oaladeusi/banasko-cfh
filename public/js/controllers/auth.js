'use strict';

angular.module('mean.system')
  .controller('Auth', ['$scope', '$http', function ($scope, $http) {

    $scope.signupUser = {};

    $scope.message = null;

    $scope.signup = () => {
      console.log("ggdgdgdg")
      $http.post('/api/auth/signup', $scope.signupUser).then((res) => {
        $scope.message = res.data.message
      }, (err) => {
        console.log($scope.signupUser)
        console.log(err);
        $scope.message = err.data.message
      });
    }


    $scope.signinUser = {}
    $scope.signin = () => {
      $http.post('/api/auth/login', $scope.signinUser)
        .then((res) => {
          console.log(res)
          $scope.message = "Login successful";
        },
        (err) => {
          console.log(err)
          $scope.message = "Invalid login details"
        });
    };


  }])