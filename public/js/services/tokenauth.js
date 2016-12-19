angular.module('mean.system')
  .factory('tokenAuth', ($window) => {
    let cachedToken = null;
    
    const setToken = (token) => {
      cachedToken = token;
      cachedToken = $window.localStorage.setItem('authToken', token);
    };

    const getToken = () => {
      if (!cachedToken) {
        cachedToken = $window.localStorage.getItem('authToken');
      }
      return cachedToken;
    };
    
    const deleteToken = () => {
      cachedToken = null,
      cachedToken = $window.localStorage.removeItem('authToken');
    };
    
    const isAuthenticated = () => {
      return !!getToken();
    };

    return {
      setToken: setToken,
      getToken: getToken,
      deleteToken: deleteToken,
      isAuthenticated: isAuthenticated
    };
  });
  