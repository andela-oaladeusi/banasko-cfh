'use strict';
angular.module('mean.system')
  .controller('logoutCtrl', ['$scope', 'tokenAuth', '$location', function($scope, tokenAuth, $location) {
      tokenAuth.deleteToken('authToken');
      $location.path('/');
  }])