angular.module('mean.system')
  .service('authInterceptor', function (tokenAuth) {
      return {
        request: function(config) {
          var token = tokenAuth.getToken();
          if(token){
              config.headers.Authorization = 'Bearer ' + token;
					}
            // conssole.log(config.headers);
            return config;
        },

        response : function(response) {
					// console.log(response);
          return response;
        }
      };
  });