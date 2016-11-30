'use strict';
angular.module('mean.system')
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
  .controller('GameController', ['$scope', '$http', 'game', '$timeout', '$location', 'MakeAWishFactsService', '$dialog', ($scope, $http, game, $timeout, $location, MakeAWishFactsService, $dialog) => {
=======
  .controller('GameController', ['$scope', '$http', 'game', '$timeout', '$location', 'MakeAWishFactsService', '$dialog', function ($scope, $http, game, $timeout, $location, MakeAWishFactsService, $dialog) {
>>>>>>> Add search api and updating files
    $scope.hasPickedCards = false;
    $scope.winningCardPicked = false;
    $scope.showTable = false;
    $scope.modalShown = false;
    $scope.game = game;
    $scope.pickedCards = [];
    let makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
    $scope.makeAWishFact = makeAWishFacts.pop();
    $scope.numberOfInvite = 1
    $scope.invitedPlayersList = [];
    $scope.checkExist = true;

    $scope.pickCard = (card) => {
      if (!$scope.hasPickedCards) {
        if ($scope.pickedCards.indexOf(card.id) < 0) {
          $scope.pickedCards.push(card.id);
          if (game.curQuestion.numAnswers === 1) {
            $scope.sendPickedCards();
            $scope.hasPickedCards = true;
          } else if (game.curQuestion.numAnswers === 2 &&
            $scope.pickedCards.length === 2) {
            //delay and send
            $scope.hasPickedCards = true;
            $timeout($scope.sendPickedCards, 300);
          }
        } else {
          $scope.pickedCards.pop();
        }
      }
    };

    $scope.pointerCursorStyle = () => {
      if ($scope.isCzar() && $scope.game.state === 'waiting for czar to decide') {
        return { 'cursor': 'pointer' };
      } else {
        return {};
      }
    };

    $scope.sendPickedCards = () => {
      game.pickCards($scope.pickedCards);
      $scope.showTable = true;
    };

    $scope.cardIsFirstSelected = (card) => {
      if (game.curQuestion.numAnswers > 1) {
        return card === $scope.pickedCards[0];
      } else {
        return false;
      }
    };

    $scope.cardIsSecondSelected = (card) => {
      if (game.curQuestion.numAnswers > 1) {
        return card === $scope.pickedCards[1];
      } else {
        return false;
      }
    };

    $scope.firstAnswer = ($index) => {
      if ($index % 2 === 0 && game.curQuestion.numAnswers > 1) {
        return true;
      } else {
        return false;
      }
    };

    $scope.secondAnswer = ($index) => {
      if ($index % 2 === 1 && game.curQuestion.numAnswers > 1) {
        return true;
      } else {
        return false;
      }
    };

    $scope.showFirst = (card) => {
      return game.curQuestion.numAnswers > 1 && $scope.pickedCards[0] === card.id;
    };

    $scope.showSecond = (card) => {
      return game.curQuestion.numAnswers > 1 && $scope.pickedCards[1] === card.id;
    };

    $scope.isCzar = () => {
      return game.czar === game.playerIndex;
    };

    $scope.isPlayer = ($index) => {
      return $index === game.playerIndex;
    };

    $scope.isCustomGame = () => {
      return !(/^\d+$/).test(game.gameID) && game.state === 'awaiting players';
    };

    $scope.isPremium = ($index) => {
      return game.players[$index].premium;
    };

    $scope.currentCzar = ($index) => {
      return $index === game.czar;
    };

    $scope.winningColor = ($index) => {
      if (game.winningCardPlayer !== -1 && $index === game.winningCard) {
        return $scope.colors[game.players[game.winningCardPlayer].color];
      } else {
        return '#f9f9f9';
      }
    };

    $scope.pickWinning = (winningSet) => {
      if ($scope.isCzar()) {
        game.pickWinning(winningSet.card[0]);
        $scope.winningCardPicked = true;
      }
    };

    $scope.winnerPicked = () => {
      return game.winningCard !== -1;
    };

    $scope.startGame = () => {
      const element = angular.element('#alertModal');
      if (game.players.length >= game.playerMinLimit) {
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
        game.startGame();
      } else {
        element.modal('show');
=======
        game.startGame();;
      } else {
        element.modal('show');
        // alert("need more players to play game");
>>>>>>> Add search api and updating files
      }
    };

    $scope.abandonGame = () => {
      game.leaveGame();
      $location.path('/');
    };

    // Catches changes to round to update when no players pick card
    // (because game.state remains the same)
    $scope.$watch('game.round', () => {
      $scope.hasPickedCards = false;
      $scope.showTable = false;
      $scope.winningCardPicked = false;
      $scope.makeAWishFact = makeAWishFacts.pop();
      if (!makeAWishFacts.length) {
        makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
      }
      $scope.pickedCards = [];
    });

    // In case player doesn't pick a card in time, show the table
    $scope.$watch('game.state', () => {
      if (game.state === 'waiting for czar to decide' && $scope.showTable === false) {
        $scope.showTable = true;
      }
    });



    $scope.$watch('game.gameID', () => {
      if (game.gameID && game.state === 'awaiting players') {
        if (!$scope.isCustomGame() && $location.search().game) {
          // If the player didn't successfully enter the request room,
          // reset the URL so they don't think they're in the requested room.
          $location.search({});
        } else if ($scope.isCustomGame() && !$location.search().game) {
          // Once the game ID is set, update the URL if this is a game with friends,
          // where the link is meant to be shared.
          $location.search({ game: game.gameID });
          if (!$scope.modalShown) {
            setTimeout(() => {
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
              $('#lobby-how-to-play').html('<button class="btn btn-info btn-lg" data-toggle="modal" data-target="#inviteModal">Invite Friends</button>');              
=======
              $scope.link = document.URL;
              let txt = 'Give the following link to your friends so they can join your game: ';
              $('#lobby-how-to-play').html('<button class="btn btn-info btn-lg" data-toggle="modal" data-target="#exampleModal">Invite Friends</button>');
              // $('#oh-el').css({'text-align': 'center', 'font-size':'22px', 'background': 'white', 'color': 'black'}).text(game.gameID);
>>>>>>> Add search api and updating files
            }, 200);
            $scope.modalShown = true;
          }
        }
      }
    });

    if ($location.search().game && !(/^\d+$/).test($location.search().game)) {
      console.log('joining custom game');
      game.joinGame('joinGame', $location.search().game);
    } else if ($location.search().custom) {
      game.joinGame('joinGame', null, true);
    } else {
      game.joinGame();
    }

    $scope.searchDB = (searchString) => {
      $scope.searchResult = [];
      $http.get('/api/search/users/' + searchString)
        .success((res) => {
          $scope.items = res;
        })
        .error((err) => {
          console.log(err);
        });
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
    };
=======
    }
>>>>>>> Add search api and updating files

    $scope.sendInvite = (email, name) => {
      const element = angular.element('#alertInviteModal');
      if ($scope.numberOfInvite <= game.playerMaxLimit) {
        if ($scope.invitedPlayersList.indexOf(email) === -1) {
          $scope.invitedPlayersList.push(email);
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
=======
          console.log($scope.invitedPlayersList);
>>>>>>> Add search api and updating files
          $http.post('/api/send/user-invite', { 'email': email, 'name': name, 'link': document.URL })
            .success((res) => {
              console.log(res);

            })
            .error((err) => {
              console.log(err);
            });
          $scope.numberOfInvite += 1;
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
=======
          console.log($scope.numberOfInvite);
>>>>>>> Add search api and updating files

        } else {
          console.log('user already exist');
        }

      } else {
        element.modal('show');
      }
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
    };
=======
    }
>>>>>>> Add search api and updating files

    $scope.checkPlayer = (email) => {
      if ($scope.invitedPlayersList.indexOf(email) === -1) {
        return true;
      } else {
        return false;
      }
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
    };

  }]);
=======
    }

  }])
>>>>>>> Add search api and updating files
