'use strict';

angular.module('mean.system')
  .controller('ChatCtrl', ['$scope', 'game',
    function ($scope, game) {
      $scope.chats = game.cfhChat;
      $scope.chatWindow = false;
      $scope.form = {};


      /** 
       * Checks if chat message is from the user.
       * @param{String} username of the user
       */
      $scope.isUser = (username) => {
        return $scope.chats.username === username;
      };

      /** 
       * Sends a new message.
       *  @param{String} message to send
       */
      $scope.send = () => {
        $scope.chats.postMessage($scope.form.message);
        $scope.form.message = '';
        scrollChats();
      };

      /** 
       * Show and hide chat.
       */
      $scope.showChat = () => {
        $scope.chatWindow = !$scope.chatWindow;
        if ($scope.chatWindow) {
          scrollChats();
        }
      };

      /** 
       * Scrolls chat to bottom.
       */
      function scrollChats() {
        const element = document.getElementById('chat-body');
        if (element) {
          setTimeout(function () {
            element.scrollTop = element.scrollHeight;
          }, 100);
        }
      }
      scrollChats();
    }
  ]);