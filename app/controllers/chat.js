'use strict';

angular.module('mean.system')

  .controller('ChatCtrl', ['$scope', 'game',
    function ($scope, game) {
      $scope.chat = game.cfhChat;
      console.log($scope.chat);

      $scope.save = () => {
        $scope.chat.postMessage($scope.chatMessage);
      };
  }]);