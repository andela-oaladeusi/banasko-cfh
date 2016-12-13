'use strict';
angular.module('mean.system')
  .factory('searchService', ['$http', '$q', function($http, $q) {
    return function(string) {
      const deferred = $q.defer();
      $http.get('/api/search/users/' + string)
        .success((res) => {
           deferred.resolve(res);
         });
          return deferred.promise;
      };
  }])
  .factory('sendEmail', ['$http', '$q', function($http, $q) {
     return function(email, name, link) {
       const deferred = $q.defer();
       $http.post('/api/send/user-invite', {
         'email': email,
         'name': name,
         'link': link
      })
       .success((res) => {
          deferred.resolve(res);
        });
      return deferred.promise;
    };
  }]);
